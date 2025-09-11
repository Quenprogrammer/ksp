import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataTest} from './Domain-App/chat/data-test/data-test';
import {Dashboard} from './Domain-App/loan-system/admin/dashboard/dashboard';
import {LoanHistoryReports} from './Domain-App/loan-system/admin/loan-history-reports/loan-history-reports';
import {Application} from './Domain-App/loan-system/admin/application/application';
import {CryptoTokens} from './data/crypto-tokens';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTest, Dashboard, LoanHistoryReports, Application, CryptoTokens],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ksp');
}
