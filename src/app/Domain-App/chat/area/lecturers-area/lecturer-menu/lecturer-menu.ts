import {Component, signal} from '@angular/core';
import {AddDepartment} from '../../../admin/add-department/add-department';
import {AddStudent} from '../../../admin/add-student/add-student';
import {CreatePost} from '../../../admin/create-post/create-post';
import {Modal} from '../../../../../shared/modal';
import {NgIf} from '@angular/common';
import {Inbox} from '../../../inbox/inbox';
import {LecturerInbox} from './lecturer-inbox/lecturer-inbox';
import {Notifications} from './notifications/notifications';
import {ReportProblemComponent} from './report-problem/report-problem.component';
import {SideBar} from '../../../admin/side-bar/side-bar';
import {LecturerProfile} from './lecturer-profile/lecturer-profile';
import {MenuCardHeader} from '../../../menu-card-header/menu-card-header';
import {LecturerDeleteAccount} from './lecturer-delete-account/lecturer-delete-account';

@Component({
  selector: 'app-lecturer-menu',
  imports: [
    AddDepartment,
    AddStudent,
    CreatePost,
    Modal,
    NgIf,
    Inbox,
    LecturerInbox,
    Notifications,
    ReportProblemComponent,
    SideBar,
    LecturerProfile,
    MenuCardHeader,
    LecturerDeleteAccount,

  ],
  templateUrl: './lecturer-menu.html',
  styleUrl: './lecturer-menu.css'
})
export class LecturerMenu {
  height3 = '530px';
  width2 = '900px';
  inbox = signal(false);
  search = signal(false);
  password = signal(false);
  notification = signal(false);
  settings = signal(false);
  reportIssues = signal(false);
menuDevice = signal(true);
  deleteAccount = signal(false);
  nav = signal(false);

  closeSearch(){
    this.search.set(false)
  }

  closeInbox(){
    this.inbox.set(false)
  }
  closePassword(){
    this.password.set(false)
  }

  closeNotifications(){
    this.notification.set(false)
  }

  closeSettings(){
    this.settings.set(false)
  }
  closereportIssues(){
    this.reportIssues.set(false)
  }
  closedeleteAccount(){
    this.deleteAccount.set(false)
  }

  lecturer: any = null;

  ngOnInit() {
    // Get lecturer data passed from search page
    this.lecturer = history.state.lecturer || null;
  }
}
