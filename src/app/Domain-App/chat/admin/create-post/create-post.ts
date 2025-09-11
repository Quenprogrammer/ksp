import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePost {
  post = {
    title: '',
    description: '',
    videoUrl: '',
    link: '',
    fileUrl: '' // this will store uploaded file URL
  };

  selectedFile: File | null = null;

  constructor(private firestore: Firestore, private storage: Storage) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async createPost() {
    try {
      // If file selected, upload to Firebase Storage first
      if (this.selectedFile) {
        const filePath = `uploads/${Date.now()}_${this.selectedFile.name}`;
        const storageRef = ref(this.storage, filePath);
        await uploadBytes(storageRef, this.selectedFile);
        this.post.fileUrl = await getDownloadURL(storageRef);
      }

      // Save post to Firestore
      const postsRef = collection(this.firestore, 'posts');
      await addDoc(postsRef, this.post);

      console.log("✅ Post saved successfully:", this.post);

      // Reset form
      this.post = { title: '', description: '', videoUrl: '', link: '', fileUrl: '' };
      this.selectedFile = null;
      alert("Post created successfully!");
    } catch (error) {
      console.error("❌ Error creating post:", error);
    }
  }
}
