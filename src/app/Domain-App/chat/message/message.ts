import {Component, Input} from '@angular/core';
import {backgroundColor, textColor} from '../../../data/config';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss'
})
export class Message {
  @Input() header: string = 'School Of Technology';
  @Input() description: string = 'Description Here';
  @Input() department: string = 'KSP complain System ';
  @Input() personContact: string = 'Departmental C';
  @Input() depCOLOR: string = 'red';
  @Input() body: string = 'Department of computer science';
  @Input() messagePadPlaceHolder: string = 'Type message to be sent';
  @Input() width: string = '200px';
  @Input() logo: string = 'chatIcons/poly/poly.png';
  @Input() messangerHeader: string = 'Current Status';
  @Input() studentName: string = 'Adamu Adamu S';
  @Input() studentPhoto: string = '';
  @Input() collection: string = '';
  @Input() sidebar = true;
  @Input() sidebarClass: string = 'col-lg-8';

departmentAdmins=[
  {name:'HOD' , document:'', documentCollection:''},
  {name:'level Coordinator' , document:'', documentCollection:''},
  {name:'Exam Officer' , document:'', documentCollection:''},
  {name:'Deputy HOD' , document:'', documentCollection:''},
  {name:'Departmental Secretary' , document:'', documentCollection:''},
  {name:'Administrative Officers' , document:'', documentCollection:''},
  {name:'Technologists / Lab Scientists' , document:'', documentCollection:''},
  {name:'President / Dept. President ' , document:'', documentCollection:''},
  {name:'General Secretary' , document:'', documentCollection:''},
  {name:'Financial Secretary / Treasure' , document:'', documentCollection:''},
  {name:'Class Representatives' , document:'', documentCollection:''},
  {name:'Lectures' , document:'', documentCollection:''},
]
  textColor='black';
  backgroundColor='white';
  class='mt-3 lead ';
  @Input() contacts: { name: string, collection:string, icon:string }[] = [];

}
