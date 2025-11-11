import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HeaderPoly} from '../request/header-poly/header-poly';
import Typed from 'typed.js';
@Component({
  selector: 'app-sections-choose',
  imports: [
    RouterLink,
    HeaderPoly
  ],
  templateUrl: './sections-choose.html',
  styleUrl: './sections-choose.css'
})
export class SectionsChoose {
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;

  // List of areas in Kano State Poly complaint app
  areas: string[] = [
    "At Kano State Polytechnic, we believe excellence in education builds a brighter future.",
    "By unlocking knowledge, we empower individuals to realize their full potential.",
    "Our commitment to innovation and integrity inspires growth across every field.",
    "Collaboration allows us to cultivate skills, ignite passions, and drive meaningful change.",
    "Together, we see education as the essential bridge to opportunity.",
    "We invite all students and staff to join us on this transformative journey."
  ];

  ngAfterViewInit(): void {
    const options = {
      strings: this.areas,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    };

    new Typed(this.typedElement.nativeElement, options);
  }
}
