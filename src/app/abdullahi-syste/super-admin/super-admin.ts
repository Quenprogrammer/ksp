import {Component, signal, ViewChild} from '@angular/core';
import {Actions} from "../../Domain-App/chat/admin/actions/actions";
import {AddDepartment} from "../../Domain-App/chat/admin/add-department/add-department";
import {AddLecturer} from "../../Domain-App/chat/admin/add-lecturer/add-lecturer";
import {AddStudent} from "../../Domain-App/chat/admin/add-student/add-student";
import {AdminChatInbox} from "../../Domain-App/chat/admin/admin-chat-inbox/admin-chat-inbox";
import {ComplainDepartmentStats} from "../../Domain-App/chat/admin/complain-department-stats/complain-department-stats";
import {ComplainStatistics} from "../../Domain-App/chat/admin/complain-statistics/complain-statistics";
import {CreatePost} from "../../Domain-App/chat/admin/create-post/create-post";
import {DepartmentStats} from "../../Domain-App/chat/admin/department-stats/department-stats";
import {Exports} from "../../Domain-App/chat/admin/actions/exports/exports";
import {LoanByInterestRateComponent} from "../../Domain-App/chat/admin/loan-by-intrest-rate/loan-by-intrest-rate";
import {Modal} from "../../shared/modal";
import {NgIf} from "@angular/common";
import {
    PasswordModalComponent
} from "../../Domain-App/loan-system/admin/settings/guard/password-modal/password-modal.component";
import {SideBar} from "../../Domain-App/chat/admin/side-bar/side-bar";
import {StatsCard} from "../../Domain-App/chat/admin/stats-card/stats-card";
import {StudentsChatView} from "../../Domain-App/chat/students-chat-view/students-chat-view";
import {HeaderPoly} from '../../Domain-App/chat/request/header-poly/header-poly';
import {RouterLink} from '@angular/router';
import {MessageFACP} from '../message-facp/message-facp';

@Component({
  selector: 'app-super-admin',
  imports: [
    Actions,
    AddDepartment,
    AddLecturer,
    AddStudent,
    AdminChatInbox,
    ComplainDepartmentStats,
    ComplainStatistics,
    CreatePost,
    DepartmentStats,
    Exports,
    LoanByInterestRateComponent,
    Modal,
    NgIf,
    PasswordModalComponent,
    SideBar,
    StatsCard,
    StudentsChatView,
    HeaderPoly,
    RouterLink,
    MessageFACP
  ],
  templateUrl: './super-admin.html',
  styleUrl: './super-admin.css'
})
export class SuperAdmin {

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
