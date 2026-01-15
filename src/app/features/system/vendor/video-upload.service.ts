import {inject, Injectable, Signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {toSignal} from "@angular/core/rxjs-interop";
import {doc, Firestore, Timestamp, updateDoc} from "@angular/fire/firestore";

interface VideoUploading {
  resourceId: string,
  progress: number,
  url: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  private readonly storage: Storage = inject(Storage);
  private readonly firestore: Firestore = inject(Firestore);

  private videosUploadingSubject = new BehaviorSubject<VideoUploading[]>([]);
  public videoUploadingProgress: Signal<VideoUploading[]> = toSignal(this.videosUploadingSubject.asObservable(), {initialValue: []});


  uploadVideo(file: File, path: string, resourceId: string, collectionId: string) {
    if (file.size > 509715200) { // 500 MB in bytes
      throw new Error('File size exceeds 200MB');
    }
    return this.uploadFile(file, path, resourceId, collectionId);
  }

  private uploadVideoUrlToDb(collection: string, documentId: string, videoUrl: string) {
    console.log("We are about to upload video to ", collection, documentId, videoUrl);

    const toUpdate = {
      video: {
        videoSrc: videoUrl,
        videoThumbnail: 'https://firebasestorage.googleapis.com/v0/b/tibet-realty.appspot.com/o/placeholder-video-thumbnail.svg?alt=media&token=9827ce41-8d2e-4d9e-ba33-05f9d562b8d1',
        haveReplacedThumbnail: false
      },
      updated: Timestamp.now()
    };
    const docRef = doc(this.firestore, collection, documentId);
    updateDoc(docRef, {...toUpdate}).then(c => {
      console.log('uploaded video successfully!');
    });
  }

  removeFromProgressWhenDone(resourceId: string) {
    const currentVideos = this.videosUploadingSubject.getValue();
    const updatedVideos = currentVideos.filter(c => c.resourceId !== resourceId);

    this.videosUploadingSubject.next(updatedVideos);
  }

  private uploadFile(file: File, path: string, resourceId: string, collectionId: string) {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);

    const uploadTask = uploadBytesResumable(fileRef, file);

    return uploadTask.on('state_changed',
      (snapshot) => {
        // Calculate progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);


        // Update videosUploadingSubject
        const currentVideos = this.videosUploadingSubject.getValue();
        const updatedVideos = currentVideos.map(video => {
          if (video.resourceId === resourceId) {
            return {...video, progress: progress};
          }
          return video;
        });
        if (!updatedVideos.some(video => video.resourceId === resourceId)) {
          updatedVideos.push({resourceId, progress: progress, url: null});
        }
        this.videosUploadingSubject.next(updatedVideos);
      },
      (error) => {
        let friendlyError = '';
        switch (error.code) {
          case 'storage/unauthorized':
            friendlyError = "User doesn't have permission to access the object";
            break;
          case 'storage/canceled':
            friendlyError = "User canceled the upload";
            break;

          case 'storage/unknown':
            friendlyError = "Unknown error occurred, inspect error.serverResponse";
            break;
        }

        // observer.error(error);
      },
      () => {
        // On successful upload, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          const currentVideos = this.videosUploadingSubject.getValue();
          const updatedVideos = currentVideos.map(video => {
            if (video.resourceId === resourceId) {
              return {...video, url: downloadURL, progress: 100};
            }
            return video;
          });
          this.videosUploadingSubject.next(updatedVideos);
        });

      }
    );
  }
}
