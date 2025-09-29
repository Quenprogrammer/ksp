import { Component } from '@angular/core';
import {ChatHeader} from '../../chat/chat-header/chat-header';
import {HeaderPoly} from '../../chat/request/header-poly/header-poly';

@Component({
  selector: 'app-loan-db',
  imports: [
    ChatHeader,
    HeaderPoly
  ],
  templateUrl: './loan-db.html',
  styleUrl: './loan-db.css'
})
export class LoanDB {

}
