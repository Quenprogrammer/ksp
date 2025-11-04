import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {HeaderPoly} from '../request/header-poly/header-poly';

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

}
