import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-user-settings',
  imports: [],
  templateUrl: './chat-user-settings.html',
  styleUrl: './chat-user-settings.css'
})
export class ChatUserSettings {
settings=[
  {name:"Update profile", icon:"", link:""},
  {name:"Delete all message", icon:"", link:""},
  {name:"Delete all Logs", icon:"", link:""},
  {name:"Backup Data", icon:"", link:""},
  {name:"Delete all notifications", icon:"", link:""},
  {name:"Security", icon:"", link:""},
  {name:"Delete account", icon:"", link:""},

]
}
