import { Component } from '@angular/core';
import {ContactForm} from './contact-form/contact-form';
import {AnoumouseFooter} from '../core/anoumouse-footer/anoumouse-footer';
import {AnoymouseHeader} from '../core/anoymouse-header/anoymouse-header';

@Component({
  selector: 'app-contact-us',
  imports: [
    ContactForm,
    AnoumouseFooter,
    AnoymouseHeader
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {

}
