import {Component, signal} from '@angular/core';

import {Modal} from '../../../../shared/modal';

import {AddStudent} from '../add-student/add-student';
import {AddLecturer} from '../add-lecturer/add-lecturer';
import {CreatePost} from '../create-post/create-post';
import {RouterLink} from '@angular/router';
import {ViewStudent} from '../view-student/view-student';

@Component({
  selector: 'app-side-bar',
  imports: [

    Modal,

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
