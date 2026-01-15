import {Component, signal} from '@angular/core';
import {Modal} from '../../system/modal';
import {NgIf} from '@angular/common';
import {UploadPost} from './upload-post';
import {Header} from '../../shared/header/header';

@Component({
  selector: 'app-post',
  imports: [
    Modal,
    NgIf,
    UploadPost,
    Header
  ],
  template: `



    <main class="content-wrapper">

      <app-header [title]="'Blog Post'"></app-header>
      <section class="container mt-3 pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">

        <div class="w-md-75 w-lg-50 text-center mx-md-auto">

          <p class="lead">Latest updates and Hand-picked resources.</p>
        </div>

        <div class="row justify-content-md-between align-items-md-center mb-7">
          <div class="col-md-5 mb-5 mb-md-0">
            <!-- Tags -->
            <div class="d-md-flex align-items-md-center   text-md-start">

              <button class="btn btn-primary mb-3" (click)="this.modal.set(true)">Upload Blog</button>
                  </div>
            <!-- End Tags -->
          </div>
          <!-- End Col -->

          <div class="col-md-5 col-lg-4">
            <form>
              <!-- Input Card -->
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search articles" aria-label="Search articles">
                <button type="button" class="btn btn-primary"><i class="bi-search"></i></button>
              </div>
              <!-- End Input Card -->
            </form>
          </div>
          <!-- End Col -->
        </div>
      </section>

      <section class="container pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">

        <div class="row">

          <!-- Posts list -->
          <div class="col">

            <div class="d-flex flex-column gap-4 mt-n3 pb-2 pb-sm-0">

              <!-- Article -->
              <article class="row align-items-start align-items-md-center gx-0 gy-4 pt-3">
                <div class="col-sm-5 pe-sm-4">
                  <a class="ratio d-flex hover-effect-scale rounded overflow-hidden flex-md-shrink-0"
                     href="blog-single-v1.html" style="--cz-aspect-ratio: calc(226 / 306 * 100%)">
                    <img src="assets/img/blog/list/09.jpg" class="hover-effect-target" alt="Image">
                  </a>
                </div>
                <div class="col-sm-7">
                  <div class="nav align-items-center gap-2 pb-2 mt-n1 mb-1">
                    <a class="nav-link text-body fs-xs text-uppercase p-0" href="#!">Gaming</a>
                    <hr class="vr my-1 mx-1">
                    <span class="text-body-tertiary fs-xs">July 27, 2024</span>
                  </div>
                  <h3 class="h5 mb-2 mb-md-3">
                    <a class="hover-effect-underline" href="blog-single-v1.html">Immersive worlds: A dive into the latest VR
                      gear and experiences</a>
                  </h3>
                  <p class="mb-0">Immersive worlds have always captured the imagination, but now, with the advent of
                    advanced VR gear, they are becoming...</p>
                </div>
              </article>


            </div>
            <hr class="mt-4 mt-sm-5">

            <!-- Pagination -->
            <nav aria-label="Blog pages">
              <ul class="pagination pagination-lg">
                <li class="page-item active" aria-current="page">
                  <span class="page-link">
                    1
                    <span class="visually-hidden">(current)</span>
                  </span>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">4</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">5</a>
                </li>
              </ul>
            </nav>
          </div>


          <!-- Sticky sidebar that turns into offcanvas on screens < 992px wide (lg breakpoint) -->
        </div>
      </section>


      <!-- Video reviews -->
    </main>
    <div class="modal-overlay" *ngIf="modal()">
      <app-modal [width]="'600px'" [height]="'600px'" (closeModal)="closeModal()">
        <div class="shadow-none">
          <div class="modal-content">
            <div class=" mb-7">
              <div class="card h-100 shadow-none border-0">
                <div class="p-1 pb-0" style="height: 500px; overflow-y: scroll">

               <app-upload-post></app-upload-post>


                </div>
              </div>
            </div>
          </div>
        </div>
      </app-modal>
    </div>
  `,
  styles:``
})
export class Post {
  modal = signal(false);
  closeModal() {
    this.modal.set(false);
  }
}
