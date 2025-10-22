import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePost {
  isSubmitting = false;

  post = {
    title: '',
    description: '',
    link: '',
    category: '',
    tags: '',
    imageUrl: '',
    author: 'KSP Admin',
    publishDate: '',
    status: 'draft',
    allowComments: true,
    isFeatured: false
  };

  constructor(private firestore: Firestore) {}

  async createPost() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    try {
      // Automatically fill publish date (MM/DD/YYYY)
      const now = new Date();
      const formattedDate = `${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${now
        .getDate()
        .toString()
        .padStart(2, '0')}/${now.getFullYear()}`;

      const postsRef = collection(this.firestore, 'posts');
      await addDoc(postsRef, {
        ...this.post,
        publishDate: formattedDate,
        createdAt: now
      });

      console.log('✅ Post saved successfully:', this.post);
      alert('Post created successfully!');

      // Reset form and retain defaults
      this.post = {
        title: '',
        description: '',
        link: '',
        category: '',
        tags: '',
        imageUrl: '',
        author: 'KSP Admin',
        publishDate: '',
        status: 'draft',
        allowComments: true,
        isFeatured: false
      };
    } catch (error) {
      console.error('❌ Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
