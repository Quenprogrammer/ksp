import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { OthersComponent } from './others/others.component';
import { DetailsComponent } from './details/details.component';
import { ModelsComponent } from './models/models.component';


@Component({
  selector: 'lh-vendors-view-page',
  imports: [
    NgForOf,
    OthersComponent,
    DetailsComponent,
    ModelsComponent,

  ],
  templateUrl: './vendors-view-page.component.html',
  styleUrl: './vendors-view-page.component.scss',
})
export class VendorsViewPageComponent {
  thumbnails: string[] = [
    'assets/img/shop/electronics/product/gallery/th01.png',
    'assets/img/shop/electronics/product/gallery/th02.png',
    'assets/img/shop/electronics/product/gallery/th03.png',
    'assets/img/shop/electronics/product/gallery/th04.png',
    'assets/img/shop/electronics/product/gallery/th05.png',
    'assets/img/shop/electronics/product/gallery/th06.png',
    'assets/img/shop/electronics/product/gallery/th07.png',
  ];
}
