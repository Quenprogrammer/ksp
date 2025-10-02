import { Component } from '@angular/core';
import {CreateAccount} from '../../../shared/create-account/create-account';

@Component({
  selector: 'app-loan-create-account',
  imports: [
    CreateAccount
  ],
  templateUrl: './loan-create-account.html',
  styleUrl: './loan-create-account.css'
})
export class LoanCreateAccount {

}
