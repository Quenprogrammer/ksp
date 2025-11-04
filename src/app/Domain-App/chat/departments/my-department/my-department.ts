
import {RouterLink} from '@angular/router';
import {HeaderPoly} from '../../request/header-poly/header-poly';
import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf, NgIf} from '@angular/common';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Stats} from '../stats/stats';

@Component({
  selector: 'app-my-department',
  imports: [
    RouterLink,
    HeaderPoly,
    NgForOf,
    AsyncPipe,
    NgIf,
    DatePipe,
    Stats
  ],
  templateUrl: './my-department.html',
  styleUrl: './my-department.scss'
})
export class MyDepartment implements OnInit{
  posts$: Observable<any[]> | undefined;
  loading = true;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const postsRef = collection(this.firestore, 'posts');
    this.posts$ = collectionData(postsRef, { idField: 'id' });
    this.posts$.subscribe(() => (this.loading = false));
  }

  async deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const postRef = doc(this.firestore, 'posts', id);
      await deleteDoc(postRef);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  }

  viewPostDetails(post: any) {
    alert(`
Title: ${post.title}
Category: ${post.category || 'N/A'}
Author: ${post.author || 'N/A'}
Description: ${post.description || 'No description'}
Link: ${post.link || 'N/A'}
    `);
  }
  totalStudents=120
  departmentName='Computer Science'
studentsStats=[
  {level:'ND1', percent:(40/this.totalStudents)*100 ,students:40},
  {level:'ND2', percent:(30/this.totalStudents)*100 ,students:30},
  {level:'HND1', percent:(29/this.totalStudents)*100 ,students:29},
  {level:'HND2', percent:(18/this.totalStudents)*100,students:18},
]
}
