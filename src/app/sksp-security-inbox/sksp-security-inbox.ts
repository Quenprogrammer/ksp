import { Component } from '@angular/core';
import {StudentAffairsInbox} from "../student-affairs-inbox/student-affairs-inbox";

@Component({
  selector: 'app-sksp-security-inbox',
    imports: [
        StudentAffairsInbox
    ],
  templateUrl: './sksp-security-inbox.html',
  styleUrl: './sksp-security-inbox.css'
})
export class SkspSecurityInbox {

}
