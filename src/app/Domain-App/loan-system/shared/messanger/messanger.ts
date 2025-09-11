import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {NgForOf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-messanger',
  imports: [
    TitleCasePipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './messanger.html',
  styleUrl: './messanger.css'
})
export class Messanger {
  emailForm: FormGroup;
  attachments: { type: string, value: string }[] = [];

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.emailForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  addAttachment(type: string) {
    let value = '';
    if (type === 'file' || type === 'image' || type === 'doc') {
      value = prompt(`Enter ${type} URL or path:`) || '';
    } else if (type === 'link') {
      value = prompt('Enter link URL:') || '';
    }
    if (value.trim()) {
      this.attachments.push({ type, value });
    }
  }

  async onSubmit() {
    if (this.emailForm.invalid) return;

    const formData = {
      ...this.emailForm.value,
      attachments: this.attachments,
      createdAt: new Date()
    };

    const mail = this.emailForm.value.mail;
    const mailCollection = collection(this.firestore, mail); // collection name = mail

    await addDoc(mailCollection, formData);

    alert('Message submitted successfully!');
    this.emailForm.reset();
    this.attachments = [];
  }
}
