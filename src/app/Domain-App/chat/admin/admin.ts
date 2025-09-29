import {Component, signal} from '@angular/core';
import {Modal} from "../../../shared/modal";
import {NgForOf, NgIf} from "@angular/common";
import {SideBar} from './side-bar/side-bar';
import {StatsCard} from './stats-card/stats-card';
import {CreatePost} from './create-post/create-post';
import {Departments} from '../departments/departments';
import {AddDepartment} from './add-department/add-department';
import {AddStudent} from './add-student/add-student';
import {AddLecturer} from './add-lecturer/add-lecturer';
import {DepartmentStats} from './department-stats/department-stats';
import {ChatGender} from './chat-gender/chat-gender';
import {StudentsChatView} from '../students-chat-view/students-chat-view';
import {AdminChatInbox} from './admin-chat-inbox/admin-chat-inbox';
import {DepartmentsView} from './departments-view/departments-view';
import {ComplainStatistics} from './complain-statistics/complain-statistics';
import {ComplainDepartmentStats} from './complain-department-stats/complain-department-stats';

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
    ComplainDepartmentStats
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

department = signal(false);

students = signal(false);
lecturer = signal(false);
post = signal(false);
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
  height3='530px';
  width2='900px';

  // NAVBAR
  nav = signal(true);
  navOpenButton = signal(false);
  navCloseButton = signal(true);
  navClass = signal('col-md-11');
  openNav(){
    this.nav.set(true)
    this.navClass.set('col-11')
    this.navCloseButton.set(true)
    this.navOpenButton.set(false)
  }
  closeNav(){
    this.nav.set(false)
    this.navClass.set('col-12')
    this.navOpenButton.set(true)
    this.navCloseButton.set(false)
  }
}
