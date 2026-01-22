import {Component} from '@angular/core';
import {HomeEvent} from './hero-event/home-event';

@Component({
  selector: 'app-home-hero',
  imports: [
    HomeEvent

  ],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css'
})
export class HomeHero {

}
