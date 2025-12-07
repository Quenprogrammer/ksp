import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ChatHeader} from '../chat-header/chat-header';

@Component({
  selector: 'app-area',
  imports: [
    RouterLink,
    ChatHeader
  ],
  templateUrl: './area.html',
  styleUrl: './area.css'
})
export class Area {
  menu=[
    {name:'Public', link:'/chat', icon:''},
    {name:'Students', link:'/chat', icon:''},
    {name:'Lecturers', link:'/staffAccount', icon:''},
    {name:'Departments', link:'/chat', icon:''},
    {name:'Rector', link:'/chat', icon:''},
    {name:'Students affairs', link:'/chat', icon:''},
    {name:'HOD', link:'/chat', icon:''},
  ]
areas=[
  {name:'Administrators', icon:'chatIcons/admin.svg' , link:'/kspAdministrators' , description:'none'},
  {name:'Rector', icon:'assets/svg/illustrations/oc-project-development.svg' , link:'/kspRector', description:'none'},
  {name:'Student Affairs', icon:'assets/svg/illustrations/oc-chatting.svg' , link:'/kspStudentAffairs', description:'none'},
  {name:'Lecturer', icon:'chatIcons/contact.svg' , link:'/kspLecturersAREA', description:'none'},
  {name:'HOD', icon:'chatIcons/registration.svg' , link:'/kspHOD', description:'none'},
  {name:'KSP Security', icon:'chatIcons/settings/img_6.png' , link:'/kspSecurity', description:'none'},
]
}
