import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-other-bodies',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-other-bodies.html',
  styleUrl: './add-other-bodies.scss'
})
export class AddOtherBodies {
  bodyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bodyForm = this.fb.group({
      name: ['', Validators.required],
      acronym: ['', Validators.required],
      description: [''],
      foundingYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      faculty: ['', Validators.required],
      officeLocation: ['', Validators.required],
      presidentName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bodyForm.valid) {
      console.log('Institution Body Created:', this.bodyForm.value);
      alert('Institution Body created successfully!');
      this.bodyForm.reset();
    } else {
      alert('Please fill all required fields!');
    }
  }
}
