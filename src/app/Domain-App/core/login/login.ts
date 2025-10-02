import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.email, this.password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => console.error(err));
  }
}
