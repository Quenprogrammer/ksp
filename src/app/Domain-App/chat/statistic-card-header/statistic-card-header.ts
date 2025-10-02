import {Component} from '@angular/core';
import {Modal} from '../../../shared/modal';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistic-card-header',
  imports: [
    Modal,
    NgIf
  ],
  templateUrl: './statistic-card-header.html',
  styleUrl: './statistic-card-header.css'
})
export class StatisticCardHeader {
  height2='500px'
  modalWidth='400px'
  height3 = '300px';
  constructor(private router: Router) {} // ← Inject Router
  errorFields = false;
  confirmLogout() {
    console.log('User confirmed logout');
    // TODO: Add actual logout logic (e.g., Auth sign out)

    this.closeErrorModal();

    // Navigate to /home
    this.router.navigate(['/home']);
  }
  closeErrorModal() {
    this.errorFields = false;
  }
}
