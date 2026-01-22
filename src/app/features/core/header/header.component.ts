import {Component, inject, signal, TemplateRef} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
//import {gsap} from "gsap";

import { CommonModule } from '@angular/common';
import {  RouterLinkActive } from '@angular/router';

import {
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective, NgbAccordionItem,
  NgbDatepickerModule,
  NgbDropdownModule, NgbOffcanvas, OffcanvasDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import {filter} from "rxjs";

import {WhatsappService} from '../services/whatsapp-service/whatsapp.service';
import {Homepage} from '../../homepage/homepage';
import {AboutUs} from '../../about-us/about-us';
import {ProductsComponent} from '../../products/products';
import {TermsofuseComponent} from '../../system/termsofuse/termsofuse.component';
import {Investment} from '../../system/investment/investment';
import {ReturnePolicy} from '../../system/returne-policy/returne-policy';
import {Services} from '../../services/services';
import {EventsComponent} from '../../events/events';
import {ContactUs} from '../../contact-us/contact-us';
import {Blog} from '../../blog/blog';
import {DashboardComponent} from '../../admin/dashboard/dashboard.component';
import {PaymentMethodComponent} from '../../payment-method/payment-method';

//gsap.registerPlugin(ScrollTrigger)
@Component({
  selector: 'tbr-header',
  standalone: true,
  imports: [
    RouterLink,
    NgbDropdownModule,
    NgbDatepickerModule,
    RouterLinkActive,
    CommonModule,
    NgbAccordionDirective,
    NgbAccordionButton,
    NgbAccordionItem,
    NgbAccordionCollapse
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private whatsappService  = inject(WhatsappService);
  private router = inject(Router);
  closeResult = '';
  openModal = signal(false);
  closeModal() {
    this. openModal.set(false);
  }

/*  ngAfterViewInit() {

    gsap.to('.header', {
      yPercent: '0%', // Move the header up by its own height
      scrollTrigger: {
        //trigger: '.header',

        start: 'top', // Start animation when the top of .content reaches the top of the viewport
       // end: 'bottom ', // End animation when the bottom of .content reaches the top of the viewport
        //scrub: true, // Smooth scrubbing effect
        pin: 'header', // Pin the header so it remains fixed during the animation
        pinSpacing: false // Disable the spacing between pinned elements
      }
    });

    // GSAP animation


  }

  onFocus() {
    console.log("Focus actually works")
  }*/


  sendWhatsappMessage() {
    this.whatsappService.sendDefaultMessage()
  }

  isLoggedIn = false; // Change this based on your auth logic
  user = {
    name: 'Chioma Adebayo',
    email: 'chioma@example.com'
  };

  logout(): void {
    this.isLoggedIn = false;
    // Add your logout logic here
    console.log('User logged out');
    // You might want to navigate to home page
    // this.router.navigate(['/']);
  }

  routes=[
    {name:'About Us', link:'/aboutUs'},
    {name:'Products', link:'/products'},
    {name:'Blog', link:'/blog'},
    {name:'Contact Us', link:'/contactUs'},
    {name:'Events', link:'/events'},
    {name:'Services', link:'/services'},
    {name:'Our teams', link:''},
    {name:'Investments', link:''},
    {name:'FAQ', link:'/faq'},
    {name:'Terms', link:'/terms'},
  ]









}
