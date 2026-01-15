import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testing.html',
  styleUrl: './testing.css'
})
export class Testing  {

}
