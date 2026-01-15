import { Component } from '@angular/core';
import {EventsRestoreComponent} from './events-restore/events-restore.component';
import {BlogComponent} from './blog/blog.component';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {CategoriesComponent} from './categories/categories.component';
import {HomeproductrefactorComponent} from './homeproductrefactor/homeproductrefactor.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-homepage',
  imports: [
    EventsRestoreComponent,
    BlogComponent,
    TestimonialComponent,
    CategoriesComponent,
    HomeproductrefactorComponent,
    CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
