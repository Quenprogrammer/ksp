import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'addSim', loadComponent: () => import('../app/Domain-App/loan-system/admin/add-sim/add-sim').then(c => c.AddSim)},
  {path: 'addBank', loadComponent: () => import('../app/Domain-App/loan-system/admin/add-bank/add-bank').then(c => c.AddBank)},
  {path: 'applications', loadComponent: () => import('../app/Domain-App/loan-system/admin/application/application').then(c => c.Application)},
  {path: 'transactions', loadComponent: () => import('../app/Domain-App/loan-system/admin/transactions/transactions').then(c => c.Transactions)},
  {path: 'logs', loadComponent: () => import('../app/Domain-App/loan-system/admin/logs/logs').then(c => c.Logs)},
  {path: 'history', loadComponent: () => import('../app/Domain-App/loan-system/admin/loan-history-reports/loan-history-reports').then(c => c.LoanHistoryReports)},
  {path: 'users', loadComponent: () => import('../app/Domain-App/loan-system/admin/users/users').then(c => c.Users)},
];
