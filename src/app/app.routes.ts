import { Routes } from '@angular/router';
import {Homepage} from './features/homepage/homepage';
import {Blog} from './features/blog/blog';
import {DashboardComponent} from './features/admin/dashboard/dashboard.component';
import {Menu} from './features/admin/menu/menu';
import {PaymentMethodComponent} from './features/payment-method/payment-method';
import {AddPaymentMethod} from './features/admin/add-payment-method/add-payment-method';
import {TermsofuseComponent} from './features/system/termsofuse/termsofuse.component';
import {Login} from './features/system/login/login';
import {Signup} from './features/system/signup/signup';

export const routes: Routes = [

  {path: '', loadComponent: () => import('../app/features/homepage/homepage').then(c => Homepage)},
  {path: 'terms', loadComponent: () => import('../app/features/terms/terms').then(c => TermsofuseComponent)},
  {path: 'anamunusStyles23', loadComponent: () => import('../app/features/homepage/homepage').then(c => Homepage)},
  {path: 'blog', loadComponent: () => import('../app/features/blog/blog').then(c => Blog)},
  {path: 'dashboard', loadComponent: () => import('../app/features/admin/dashboard/dashboard.component').then(c => DashboardComponent)},
  {path: 'paymentMethods', loadComponent: () => import('../app/features/payment-method/payment-method').then(c => PaymentMethodComponent)},
  {path: 'h', loadComponent: () => import('../app/features/admin/dashboard/homepage/homepage.component').then(c => Homepage)},


  {path: 'menu', loadComponent: () => import('../app/features/admin/menu/menu').then(c => Menu)},
  {path: 'addPayment', loadComponent: () => import('../app/features/admin/add-payment-method/add-payment-method').then(c => AddPaymentMethod)},
  {path: 'login', loadComponent: () => import('../app/features/system/login/login').then(c => Login)},
  {path: 'signup', loadComponent: () => import('../app/features/system/signup/signup').then(c => Signup)},


];
