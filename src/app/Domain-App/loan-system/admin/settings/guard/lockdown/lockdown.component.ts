import { Component } from '@angular/core';

@Component({
  selector: 'app-lockdown',
  standalone: true,
  imports: [],
  template: `
    <div class="lock-screen bg-primary">
      <header id="header" class="navbar navbar-expand navbar-light navbar-absolute-top">
        <div class="container">
          <nav class="navbar-nav-wrap">
            <!-- Default Logo -->
            <a class="navbar-brand" href="./index.html" aria-label="Front">

            </a>
            <!-- End Default Logo -->

            <div class="ms-auto">
              <a class="btn btn-danger btn-transition" href="./page-status.html">Check for updates</a>
            </div>
          </nav>
        </div>
      </header>
      <img src="gif/me.gif" class="img-fluid " style="height: 300px;">
      <h1 class=" text-danger mt-n2">  Site is currently locked down</h1>
      <p class="text-danger">Please check back later or contact support.</p>
    </div>
  `,
  styles: [`
    .lock-screen {
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
  `]
})
export class LockdownComponent {

}
