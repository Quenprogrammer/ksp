import {inject, Injectable, Signal} from '@angular/core';
import {deleteObject, getDownloadURL, listAll, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {BehaviorSubject} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";

interface ImageUploading {
  resourceId: string,
  fileName: string,
  progress: number,
  url: string | null,
}

@Injectable()
export class ImageUploadService {
  // New subject to emit download URL
  private downloadURLSubject = new BehaviorSubject<string | null>(null);

// Expose the download URL observable
  public downloadURLProgress = this.downloadURLSubject.asObservable();

  private readonly storage: Storage = inject(Storage);

  private imageUploadingSubject = new BehaviorSubject<ImageUploading[]>([]);
  public imageUploadingProgress: Signal<ImageUploading[]> = toSignal(this.imageUploadingSubject.asObservable(), {initialValue: []});


  uploadImage(file: File, path: string, resourceId: string = 'imk'): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `${path}/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);

          // Update progress
          const currentImages = this.imageUploadingSubject.getValue();
          const updatedImages = currentImages.map(image =>
            image.resourceId === resourceId ? { ...image, progress } : image
          );

          if (!updatedImages.some(image => image.resourceId === resourceId)) {
            updatedImages.push({ resourceId, fileName: file.name, progress, url: null });
          }

          this.imageUploadingSubject.next(updatedImages);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);

            // Update stored images with URL
            const currentImages = this.imageUploadingSubject.getValue();
            const updatedImages = currentImages.map(image =>
              image.resourceId === resourceId ? { ...image, url: downloadURL, progress: 100 } : image
            );
            this.imageUploadingSubject.next(updatedImages);

            // Emit the download URL
            this.downloadURLSubject.next(downloadURL);

            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }



  private uploadFile(file: File, path: string, resourceId: string) {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);

    const uploadTask = uploadBytesResumable(fileRef, file);

    return uploadTask.on('state_changed',
      (snapshot) => {
        // Calculate progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);


        // Update ImagesUploadingSubject
        const currentImages = this.imageUploadingSubject.getValue();
        const updatedImages = currentImages.map(video => {
          if (video.resourceId === resourceId) {
            return {...video, progress: progress};
          }
          return video;
        });
        if (!updatedImages.some(video => video.resourceId === resourceId)) {
          updatedImages.push({resourceId, fileName: file.name, progress: progress, url: null});
        }
        this.imageUploadingSubject.next(updatedImages);
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
          const currentImages = this.imageUploadingSubject.getValue();
          const updatedImages = currentImages.map(image => {
            if (image.resourceId === resourceId) {
              return {...image, url: downloadURL, progress: 100};
            }
            return image;
          });
          this.imageUploadingSubject.next(updatedImages);
        });
      }
    );
  }

  async listFiles(folderPath: string): Promise<string[]> {
    const folderRef = ref(this.storage, folderPath);
    try {
      const result = await listAll(folderRef);
      return result.items.map(item => item.fullPath);
    } catch (error) {
      console.error('Error listing files: ', error);
      return [];
    }
  }

  // Delete a specific file by its full path
  async deleteFile(filePath: string): Promise<void> {
    const fileRef = ref(this.storage, filePath);
    try {
      await deleteObject(fileRef);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}: `, error);
    }
  }

  // Delete all files in a folder before uploading
  async deleteAllFiles(folderPath: string): Promise<void> {
    const fileList = await this.listFiles(folderPath);
    for (const file of fileList) {
      await this.deleteFile(file);
    }
    console.log(`All files deleted in folder: ${folderPath}`);
  }


}
