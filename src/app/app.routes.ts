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
import {Services} from './features/services/services';
import {ContactUs} from './features/contact-us/contact-us';
import {Investment} from './features/system/investment/investment';
import {ReturnePolicy} from './features/system/returne-policy/returne-policy';
import {AboutUs} from './features/about-us/about-us';
import {EventsComponent} from './features/events/events';
import {ProductsComponent} from './features/products/products';

export const routes: Routes = [

  {path: '', loadComponent: () => import('../app/features/homepage/homepage').then(c => Homepage)},
  {path: 'aboutUs', loadComponent: () => import('../app/features/about-us/about-us').then(c => AboutUs)},
  {path: 'home', loadComponent: () => import('../app/features/homepage/homepage').then(c => Homepage)},
   {path: 'products', loadComponent: () => import('../app/features/products/products').then(c => ProductsComponent)},
   {path: 'terms', loadComponent: () => import('../app/features/system/termsofuse/termsofuse.component').then(c => TermsofuseComponent)},
   {path: 'investment', loadComponent: () => import('../app/features/system/investment/investment').then(c => Investment)},
   {path: 'returnPolicy', loadComponent: () => import('../app/features/system/returne-policy/returne-policy').then(c => ReturnePolicy)},
  {path: 'services', loadComponent: () => import('../app/features/services/services').then(c => Services)},
  {path: 'event', loadComponent: () => import('../app/features/events/events').then(c => EventsComponent)},
  {path: 'contactUs', loadComponent: () => import('../app/features/contact-us/contact-us').then(c => ContactUs)},
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
