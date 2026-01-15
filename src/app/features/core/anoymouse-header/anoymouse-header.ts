import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-anoymouse-header',
  imports: [],
  templateUrl: './anoymouse-header.html',
  styleUrl: './anoymouse-header.css',
})
export class AnoymouseHeader {
  pages = signal(false);
  services = signal(false);
  products = signal(false);
  openModal = signal(false);
}
