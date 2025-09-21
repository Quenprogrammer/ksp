import {Component, signal} from '@angular/core';
import {AddBank} from '../../../loan-system/admin/add-bank/add-bank';
import {AddSim} from '../../../loan-system/admin/add-sim/add-sim';
import {Inbox} from '../../../loan-system/admin/dashboard/inbox/inbox';
import {Modal} from '../../../../shared/modal';
import {Notifications} from '../../../loan-system/admin/dashboard/notifications/notifications';
import {SendMessageComponent} from '../../../loan-system/admin/components/send-message/send-message.component';
import {AddAdministrators} from '../add-administrators/add-administrators';
import {AddDepartment} from '../add-department/add-department';
import {AddStudent} from '../add-student/add-student';
import {AddLecturer} from '../add-lecturer/add-lecturer';
import {CreatePost} from '../create-post/create-post';
import {RouterLink} from '@angular/router';
import {ViewStudent} from '../view-student/view-student';

@Component({
  selector: 'app-side-bar',
  imports: [
    AddBank,
    AddSim,
    Inbox,
    Modal,
    Notifications,
    SendMessageComponent,
    AddAdministrators,
    AddDepartment,
    AddStudent,
    AddLecturer,
    CreatePost,
    RouterLink,
    ViewStudent
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  openModal = signal(false);
  students = signal(false);
  addSim = signal(false);
  inbox = signal(false);
  logs = signal(false);
  notifications = signal(false);
  compose = signal(false);
  width='800px'
  height='600px'
  closeModal() {
    this. openModal.set(false);
  }
}
