import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-poly',
  imports: [],
  templateUrl: './header-poly.html',
  styleUrl: './header-poly.scss'
})
export class HeaderPoly {
  @Input() title: string = 'Kano State Polytechnic';
  @Input() img: string = 'chatIcons/poly/polyWhiteLogo.png';
}
