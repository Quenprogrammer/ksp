import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logs',
  imports: [],
  templateUrl: './logs.html',
  styleUrl: './logs.css'
})
export class Logs {
  @Input() logs: any[] = [];
}
