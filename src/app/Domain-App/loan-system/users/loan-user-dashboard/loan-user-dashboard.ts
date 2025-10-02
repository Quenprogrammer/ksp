import {Component, signal} from '@angular/core';
import {ChatUserSettings} from '../../../chat/chat-user-settings/chat-user-settings';
import {Modal} from '../../../../shared/modal';
import {LoanUserMessages} from './loan-user-messages/loan-user-messages';
import {LoanUserNotification} from './loan-user-notification/loan-user-notification';
import {ApprovalPage} from '../approval-page/approval-page';
import {MakePayment} from './make-payment/make-payment';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {SendMessage} from './send-message/send-message';

@Component({
  selector: 'app-loan-user-dashboard',
  imports: [
    ChatUserSettings,
    Modal,
    LoanUserMessages,
    LoanUserNotification,
    ApprovalPage,
    MakePayment,
    NgIf,
    SendMessage,
    RouterLink
  ],
  templateUrl: './loan-user-dashboard.html',
  styleUrl: './loan-user-dashboard.css'
})
export class LoanUserDashboard {

  openModal = signal(false);
  payments = signal(false);
  sendMessage = signal(false);
  openModal2 = signal(false);
  settings = signal(false);
  closeModal() {
    this. openModal.set(false);
  }
  closeModal2() {
    this. openModal2.set(false);
  }
  cloeOthersModal() {
    this.settings.set(false);
  }
  closePaymentsModal() {
    this.payments.set(false);
  }
  closeSendMessage() {
    this.sendMessage.set(false);
  }

  width='900px'
  width2='900px'
  height='600px'

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
