import { Component, signal } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule
} from '@angular/forms';
import {
  Firestore, collection, addDoc
} from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgbAlertModule],
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  sendForm: FormGroup;
  isSending = signal(false);
  sendSuccess = signal(false);
  sendError = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {
    this.sendForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required]
    });
  }


  async sendMessage() {
    const messageDiv = document.getElementById('messageDiv');
    const messageHtml = messageDiv?.innerHTML || '';

    if (this.sendForm.invalid || !messageHtml.trim()) {
      this.sendError.set('Please fill out all fields including message.');
      return;
    }

    this.isSending.set(true);
    this.sendError.set(null);
    this.sendSuccess.set(false);

    try {
      const formData = this.sendForm.value;

      await addDoc(collection(this.firestore, 'MESSAGES'), {
        to: formData.to,
        subject: formData.subject,
        message: messageHtml,
        createdAt: new Date()
      });

      this.sendForm.reset();
      if (messageDiv) messageDiv.innerHTML = '';
      this.sendSuccess.set(true);
    } catch (err: any) {
      console.error(err);
      this.sendError.set(err.message || 'Sending failed.');
    } finally {
      this.isSending.set(false);
    }
  }
}
