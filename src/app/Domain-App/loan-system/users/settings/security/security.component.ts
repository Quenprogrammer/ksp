import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@Component({
  selector: 'lh-security',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgIf, DeleteAccountComponent],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent {

}
