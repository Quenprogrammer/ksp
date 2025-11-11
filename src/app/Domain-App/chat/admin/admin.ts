import { Component, ViewChild, AfterViewInit, signal } from '@angular/core';
import { Modal } from "../../../shared/modal";
import { NgForOf, NgIf } from "@angular/common";
import { SideBar } from './side-bar/side-bar';
import { StatsCard } from './stats-card/stats-card';
import { CreatePost } from './create-post/create-post';
import { Departments } from '../departments/departments';
import { AddDepartment } from './add-department/add-department';
import { AddStudent } from './add-student/add-student';
import { AddLecturer } from './add-lecturer/add-lecturer';
import { DepartmentStats } from './department-stats/department-stats';
import { ChatGender } from './chat-gender/chat-gender';
import { StudentsChatView } from '../students-chat-view/students-chat-view';
import { AdminChatInbox } from './admin-chat-inbox/admin-chat-inbox';
import { DepartmentsView } from './departments-view/departments-view';
import { ComplainStatistics } from './complain-statistics/complain-statistics';
import { ComplainDepartmentStats } from './complain-department-stats/complain-department-stats';
import { PasswordModalComponent } from "../../loan-system/admin/settings/guard/password-modal/password-modal.component";
import {LoanByInterestRateComponent} from './loan-by-intrest-rate/loan-by-intrest-rate';
import {Actions} from './actions/actions';

@Component({
  selector: 'app-admin',
  imports: [
    Modal,
    NgForOf,
    NgIf,
    SideBar,
    StatsCard,
    CreatePost,
    Departments,
    AddDepartment,
    AddStudent,
    AddLecturer,
    DepartmentStats,
    ChatGender,
    StudentsChatView,
    AdminChatInbox,
    DepartmentsView,
    ComplainStatistics,
    ComplainDepartmentStats,
    PasswordModalComponent,
    LoanByInterestRateComponent,
    Actions,


  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements AfterViewInit {


  menu=[
    {name:'', icon:'', function:''}
  ]
  // ========================
  // 🔒 PASSWORD PROTECTION
  // ========================
  accessGranted = false;
  @ViewChild(PasswordModalComponent) passwordModal!: PasswordModalComponent;
  private adminPasswords = ['12345', 'superAdminKey','usman'];

  ngAfterViewInit(): void {
    // Automatically open password modal on load
    this.passwordModal.open(this.adminPasswords);
  }

  onUnlock(success: boolean): void {
    this.accessGranted = success;
    if (!success) {
      console.warn('Access denied: Invalid admin password');
    }
  }

  // ========================
  // ⚙️ UI STATE SIGNALS
  // ========================
  department = signal(false);
  students = signal(false);
  lecturer = signal(false);
  post = signal(false);

  // ========================
  // 📦 MODAL CONTROL METHODS
  // ========================
  closeStudentModal() {
    this.students.set(false);
  }
  closeDepartment() {
    this.department.set(false);
  }
  closePost() {
    this.post.set(false);
  }
  closeLecturer() {
    this.lecturer.set(false);
  }
  closeSearchModal() {
    this.department.set(false);
  }

  // ========================
  // 🧱 LAYOUT PROPERTIES
  // ========================
  height3 = '530px';
  width2 = '900px';

  // ========================
  // 🧭 NAVBAR CONTROL
  // ========================
  nav = signal(true);
  navOpenButton = signal(false);
  navCloseButton = signal(true);
  navClass = signal('col-md-11');

  openNav() {
    this.nav.set(true);
    this.navClass.set('col-11');
    this.navCloseButton.set(true);
    this.navOpenButton.set(false);
  }

  closeNav() {
    this.nav.set(false);
    this.navClass.set('col-12');
    this.navOpenButton.set(true);
    this.navCloseButton.set(false);
  }


}
