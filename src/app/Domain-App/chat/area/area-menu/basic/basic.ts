import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-basic',
  imports: [
    NgForOf
  ],
  templateUrl: './basic.html',
  styleUrl: './basic.css'
})
export class Basic {
  @Input() formData: { label: string; value: string; type?: string }[] = [];
}
