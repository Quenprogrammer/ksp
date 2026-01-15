import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {Header} from '../shared/header/header';

interface User {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  disabled?: boolean;
  createdAt?: any;
}

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, CommonModule, Header],
  template: `
    <app-header [title]="'Users'"></app-header>
    <div class=" p-1 p-md-3 ">




        <div  >


          <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
              <thead class="table-dark">
              <tr>
                <th scope="col" style="min-width: 200px; width: 40%;">Full Name</th>
                <th scope="col" style="min-width: 100px; width: 15%;">Gender</th>
                <th scope="col" style="min-width: 120px; width: 20%;">Phone</th>
                <th scope="col" class="text-center" style="min-width: 200px; width: 25%;">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr *ngFor="let user of users$ | async" [class.table-warning]="user.disabled">
                <td>{{ user.fullName }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.phone }}</td>
                <td class="d-flex flex-wrap flex-sm-nowrap justify-content-center gap-1">
                  <button class="btn btn-info btn-sm flex-fill" (click)="viewUser(user)">
                    <i class="bi bi-eye"></i> View
                  </button>
                  <button class="btn btn-danger btn-sm flex-fill" (click)="deleteUser(user.id!)">
                    <i class="bi bi-trash"></i> Delete
                  </button>
                  <button class="btn btn-warning btn-sm flex-fill" (click)="toggleDisable(user)">
                    <i class="bi bi-slash-circle"></i> {{ user.disabled ? 'Enable' : 'Disable' }}
                  </button>
                </td>
              </tr>
              <tr *ngIf="!(users$ | async)?.length">
                <td colspan="4" class="text-center text-muted py-3">No users found.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>





      <!-- User Modal -->
      <div class="modal fade show d-block" tabindex="-1" *ngIf="selectedUser">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedUser.fullName }} - Full Information</h5>
              <button type="button" class="btn-close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Full Name:</strong> {{ selectedUser.fullName }}</li>
                <li class="list-group-item"><strong>Email:</strong> {{ selectedUser.email }}</li>
                <li class="list-group-item"><strong>Phone:</strong> {{ selectedUser.phone }}</li>
                <li class="list-group-item"><strong>Address:</strong> {{ selectedUser.address }}</li>
                <li class="list-group-item"><strong>Date of Birth:</strong> {{ selectedUser.dateOfBirth }}</li>
                <li class="list-group-item"><strong>Gender:</strong> {{ selectedUser.gender }}</li>
                <li class="list-group-item"><strong>Status:</strong>
                  <span [class.text-success]="!selectedUser.disabled" [class.text-danger]="selectedUser.disabled">
                    {{ selectedUser.disabled ? 'Disabled' : 'Active' }}
                  </span>
                </li>
                <li class="list-group-item" *ngIf="selectedUser.createdAt">
                  <strong>Registered:</strong> {{ selectedUser.createdAt?.toDate() | date: 'medium' }}
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" *ngIf="selectedUser"></div>
    </div>
  `,
  styles: [`
    .table-warning {
      background-color: rgba(255, 193, 7, 0.1);
    }
  `]
})
export class Users implements OnInit {
  users$: Observable<User[]>;
  selectedUser: User | null = null;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  ngOnInit(): void {}

  viewUser(user: User): void {
    this.selectedUser = user;
  }

  closeModal(): void {
    this.selectedUser = null;
  }

  async deleteUser(userId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const userDoc = doc(this.firestore, 'users', userId);
        await deleteDoc(userDoc);
        console.log('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
      }
    }
  }

  async toggleDisable(user: User): Promise<void> {
    const action = user.disabled ? 'enable' : 'disable';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const userDoc = doc(this.firestore, 'users', user.id!);
        await updateDoc(userDoc, {
          disabled: !user.disabled
        });
        console.log(`User ${action}d successfully`);
      } catch (error) {
        console.error(`Error ${action}ing user:`, error);
        alert(`Error ${action}ing user. Please try again.`);
      }
    }
  }
}
