import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  customerForm: FormGroup;
  retailerForm: FormGroup;
  activeTab: string = 'customers';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    // Customer form
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

    // Retailer form
    this.retailerForm = this.fb.group({
      company: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async submitCustomer() {
    if (this.customerForm.valid) {
      try {
        const formData = {
          ...this.customerForm.value,
          timestamp: new Date(),
          type: 'customer'
        };
        const docRef = await addDoc(collection(this.firestore, 'contactMessages'), formData);
        console.log('Document written with ID: ', docRef.id);
        this.customerForm.reset();
        alert('Message sent successfully!');
      } catch (e) {
        console.error('Error adding document: ', e);
        alert('Error sending message. Please try again.');
      }
    } else {
      this.markFormGroupTouched(this.customerForm);
    }
  }

  async submitRetailer() {
    if (this.retailerForm.valid) {
      try {
        const formData = {
          ...this.retailerForm.value,
          timestamp: new Date(),
          type: 'retailer'
        };
        const docRef = await addDoc(collection(this.firestore, 'contactMessages'), formData);
        console.log('Document written with ID: ', docRef.id);
        this.retailerForm.reset();
        alert('Message sent successfully!');
      } catch (e) {
        console.error('Error adding document: ', e);
        alert('Error sending message. Please try again.');
      }
    } else {
      this.markFormGroupTouched(this.retailerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
