import {Component, inject, TemplateRef} from '@angular/core';
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

  ngOnInit() {
    this.router.events.subscribe(event => {

        this.offcanvasService.dismiss("Due to navigation");
        // Perform actions you want to execute on route change
       // console.log('Route changed:', event.url);

    });
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

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', scroll:true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

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
}
