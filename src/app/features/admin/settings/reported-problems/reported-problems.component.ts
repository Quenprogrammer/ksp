import {Component, inject} from '@angular/core';

import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

export interface Ticket {
  createdAt: any;
  fileUrl: string | null;
  message: string;
  name: string;
  photo: string;
  priority: string;
}

@Component({
  selector: 'app-reported-problems',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './reported-problems.component.html',
  styleUrl: './reported-problems.component.scss'
})
export class ReportedProblemsComponent {


  messages$: Observable<any[]> | undefined;

  ngOnInit(): void {

  }
  priorityToStars(priority: string): number {
    switch (priority) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      case 'Critical': return 4;
      default: return 0;
    }
  }
  async deleteMessage(id: string) {

  }
}
