import { Routes } from '@angular/router';
import {Start} from './Domain-App/chat/start/start';
import {Admin} from './Domain-App/chat/admin/admin';
import {SecurityIssues} from './Domain-App/chat/message/security-issues';
import {StudentAffairs} from './Domain-App/chat/message/student-affairs';
import {KSPAdministrators} from './Domain-App/chat/message/kspadministrators';

import {Rector} from './Domain-App/chat/message/rector';
import {Login} from './Domain-App/core/login/login';
import {Public} from './Domain-App/chat/public/public';
import {Misconducts} from './Domain-App/chat/message/misconducts';
import {Lecturers} from './Domain-App/chat/message/lecturers';
import {System} from './Domain-App/chat/admin/system/system';

import {MyDepartment} from './Domain-App/chat/departments/my-department/my-department';
import {Chat} from './Domain-App/chat/chat';
import {ViewStudent} from './Domain-App/chat/admin/view-student/view-student';
import {ProfileLoan} from './Domain-App/loan-system/users/profile-loan/profile-loan';
import {ApplyLoan} from './Domain-App/loan-system/users/apply-loan/apply-loan';
import {MainChatStudentDashboard} from './Domain-App/chat/main-chat-student-dashboard/main-chat-student-dashboard';
import {LoanCreateAccount} from './Domain-App/loan-system/loan-create-account/loan-create-account';
import {LoginLoan} from './Domain-App/loan-system/users/login-loan/login-loan';
import {LoanUserDashboard} from './Domain-App/loan-system/users/loan-user-dashboard/loan-user-dashboard';
import {Policy} from './Domain-App/loan-system/users/policy/policy';
import {TermsAndConditions} from './Domain-App/loan-system/users/terms-and-conditions/terms-and-conditions';
import {Penalty} from './Domain-App/loan-system/users/penalty/penalty';
import {LoanPublicSite} from './Domain-App/loan-system/loan-public-site/loan-public-site';
import {Rules} from './Domain-App/loan-system/users/rules/rules';
import {Records} from './Domain-App/loan-system/admin/dashboard/records/records';

export const routes: Routes = [
  {path: 'addSim', loadComponent: () => import('../app/Domain-App/loan-system/admin/add-sim/add-sim').then(c => c.AddSim)},
  {path: 'addBank', loadComponent: () => import('../app/Domain-App/loan-system/admin/add-bank/add-bank').then(c => c.AddBank)},
  {path: 'applications', loadComponent: () => import('../app/Domain-App/loan-system/admin/application/application').then(c => c.Application)},
  {path: 'transactions', loadComponent: () => import('../app/Domain-App/loan-system/admin/transactions/transactions').then(c => c.Transactions)},
  {path: 'logs', loadComponent: () => import('../app/Domain-App/loan-system/admin/logs/logs').then(c => c.Logs)},
  {path: 'history', loadComponent: () => import('../app/Domain-App/loan-system/admin/loan-history-reports/loan-history-reports').then(c => c.LoanHistoryReports)},
  {path: 'users', loadComponent: () => import('../app/Domain-App/loan-system/admin/users/users').then(c => c.Users)},
  {path: 'setting', loadComponent: () => import('../app/Domain-App/loan-system/admin/settings/settings.component').then(c => c.SettingsComponent)},
  {path: 'loanApp', loadComponent: () => import('../app/Domain-App/loan-system/loan-system').then(c => c.LoanSystem)},
  {path: 'admin', loadComponent: () => import('../app/Domain-App/loan-system/admin/dashboard/dashboard').then(c => c.Dashboard)},
  {path: 'statistics', loadComponent: () => import('../app/Domain-App/loan-system/admin/statistics/statistics').then(c => c.Statistics)},
  {path: 'database', loadComponent: () => import('../app/Domain-App/loan-system/loan-db/loan-db').then(c => c.LoanDB)},
  {path: 'accountProfile', loadComponent: () => import('../app/Domain-App/loan-system/users/profile-loan/profile-loan').then(c => ProfileLoan)},
  {path: 'applyLoan', loadComponent: () => import('../app/Domain-App/loan-system/users/apply-loan/apply-loan').then(c => ApplyLoan)},
  {path: 'LoanSystemAccount', loadComponent: () => import('../app/Domain-App/loan-system/loan-create-account/loan-create-account').then(c => LoanCreateAccount)},
  {path: 'LoanSystemLogin', loadComponent: () => import('../app/Domain-App/loan-system/users/login-loan/login-loan').then(c => LoginLoan)},
  {path: 'UserDashboard', loadComponent: () => import('../app/Domain-App/loan-system/users/loan-user-dashboard/loan-user-dashboard').then(c => LoanUserDashboard)},
  {path: 'records', loadComponent: () => import('../app/Domain-App/loan-system/admin/dashboard/records/records').then(c => Records)},

  {path: 'loanPolicy', loadComponent: () => import('../app/Domain-App/loan-system/users/policy/policy').then(c => Policy)},
  {path: 'loanTerms', loadComponent: () => import('../app/Domain-App/loan-system/users/terms-and-conditions/terms-and-conditions').then(c => TermsAndConditions)},
  {path: 'loanPenalty', loadComponent: () => import('../app/Domain-App/loan-system/users/penalty/penalty').then(c => Penalty)},
  {path: 'loanSystemPublic', loadComponent: () => import('../app/Domain-App/loan-system/loan-public-site/loan-public-site').then(c => LoanPublicSite)},
  {path: 'loanRules', loadComponent: () => import('../app/Domain-App/loan-system/users/rules/rules').then(c => Rules)},
 {path: 'signup', loadComponent: () => import('../app/Domain-App/chat/create-account/create-account').then(c => c.CreateAccount)},
  {path: 'loan-system', loadComponent: () => import('../app/Domain-App/loan-system/loan-system').then(c => c.LoanSystem)},


  {path: 'departments', loadComponent: () => import('../app/Domain-App/chat/departments/departments').then(m => m.Departments)},
  {path: 'messagesLogs', loadComponent: () => import('../app/Domain-App/chat/admin/messages-logs/messages-logs').then(m => m.MessagesLogs)},
  {path: 'inbox', loadComponent: () => import('../app/Domain-App/chat/inbox/inbox').then(m => m.Inbox)},
  {path: 'message', loadComponent: () => import('../app/Domain-App/chat/message/message').then(m => m.Message)},
  {path: 'helpCenter', loadComponent: () => import('../app/Domain-App/chat/help-center/help-center').then(m => m.HelpCenter)},
  {path: 'findLecturer', loadComponent: () => import('../app/Domain-App/chat/find-lecturer/find-lecturer').then(m => m.FindLecturer)},
  {path: 'findStudents', loadComponent: () => import('../app/Domain-App/chat/students-chat-view/students-chat-view').then(m => m.StudentsChatView)},
    {path: 'request', loadComponent: () => import('../app/Domain-App/chat/request/request').then(m => m.Request)},
  {path: 'vote', loadComponent: () => import('../app/Domain-App/chat/vote/vote').then(m => m.Vote)},
  {path: 'others', loadComponent: () => import('../app/Domain-App/chat/others/others').then(m => m.Others)},
     {path: 'viewStudentsDepartment', loadComponent: () => import('../app/Domain-App/chat/departments/view-department-students/view-department-students').then(m => m.ViewDepartmentStudents)},
  {path: 'myDepartment', loadComponent: () => import('../app/Domain-App/chat/departments/my-department/my-department').then(m => MyDepartment)},
  {path: 'login', loadComponent: () => import('../app/Domain-App/core/login/login').then(m => Login)},
    {path: 'public', loadComponent: () => import('../app/Domain-App/chat/public/public').then(m => Public)},
  {path: 'lecturers', loadComponent: () => import('../app/Domain-App/chat/message/lecturers').then(m => Lecturers)},
  {path: 'misconducts', loadComponent: () => import('../app/Domain-App/chat/message/misconducts').then(m => Misconducts)},
  {path: 'rector', loadComponent: () => import('../app/Domain-App/chat/message/rector').then(m => Rector)},
  {path: 'security', loadComponent: () => import('../app/Domain-App/chat/message/security-issues').then(m => SecurityIssues)},
  {path: 'student-affairs', loadComponent: () => import('../app/Domain-App/chat/message/student-affairs').then(m => StudentAffairs)},
  {path: 'administrators', loadComponent: () => import('../app/Domain-App/chat/message/kspadministrators').then(m => KSPAdministrators)},
  {path: 'adminComplainSystem', loadComponent: () => import('../app/Domain-App/chat/admin/admin').then(m => Admin)},
  {path: 'view-student', loadComponent: () => import('../app/Domain-App/chat/admin/view-student/view-student').then(m => ViewStudent)},
  {path: 'system', loadComponent: () => import('../app/Domain-App/chat/admin/system/system').then(m => System)},
   {path: 'studentDashboard', loadComponent: () => import('../app/Domain-App/chat/chat').then(m => Chat)},
   {path: 'complainSystem', loadComponent: () => import('../app/Domain-App/chat/main-chat-student-dashboard/main-chat-student-dashboard').then(m => MainChatStudentDashboard)},






];
