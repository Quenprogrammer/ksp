import { Component } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Modal} from '../../../../../../shared/modal';

@Component({
  selector: 'lh-delete-account',
  imports: [Modal, NgIf, FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
  deleteModal = false;
  confirmDelete = false;
  confirmDeleteFinal = false;

  openDeleteModal() {
    if (!this.confirmDelete) {
      alert('Please tick "Yes, I want to delete my account" first.');
      return;
    }
    this.deleteModal = true;
  }

  closeDeleteModal() {
    this.deleteModal = false;
    this.confirmDeleteFinal = false;
  }

  deleteAccount() {
    // Call your delete service / Firebase / API
    console.log('Account deletion confirmed.');
    this.deleteModal = false;
  }
  width2 = '400px';
  height3 = '300px';


}
