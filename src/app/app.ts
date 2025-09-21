import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import {Dashboard} from './Domain-App/loan-system/admin/dashboard/dashboard';
import {LoanHistoryReports} from './Domain-App/loan-system/admin/loan-history-reports/loan-history-reports';
import {Application} from './Domain-App/loan-system/admin/application/application';
import {CryptoTokens} from './data/crypto-tokens';
import {FirestoreCountService} from './services/firestore-count.service';
import {Chat} from './Domain-App/chat/chat';
import {Admin} from './Domain-App/chat/admin/admin';
import {LoginChat} from './Domain-App/chat/login-chat/login-chat';
import {ViewStudent} from './Domain-App/chat/admin/view-student/view-student';
import {DepartmentsView} from './Domain-App/chat/admin/departments-view/departments-view';
import {AddDepartment} from './Domain-App/chat/admin/add-department/add-department';
import {LoanSystem} from './Domain-App/loan-system/loan-system';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Dashboard, LoanHistoryReports, Application, CryptoTokens, Chat, Admin, LoginChat, ViewStudent, DepartmentsView, AddDepartment, LoanSystem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ksp');
  constructor(private counterService: FirestoreCountService) {}

  async add() {
    try {
      await this.counterService.increaseCount('myCollection', 'myDocId', 5);
      alert('Count updated successfully ✅'); // You can replace this with Angular Material Snackbar or Toast
    } catch (error) {
      alert('Failed to update count ❌');
    }
  }
}
