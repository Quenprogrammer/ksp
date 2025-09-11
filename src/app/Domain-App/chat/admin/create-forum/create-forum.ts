import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-forum',
  imports: [
    FormsModule
  ],
  templateUrl: './create-forum.html',
  styleUrl: './create-forum.scss'
})
export class CreateForum {
  group: any = {
    groupName: '',
    institution: '',
    department: '',
    description: '',
    privacy: 'public'
  };

  onSubmit() {
    console.log("New Student Chat Group Created:", this.group);
    alert("Student chat group created successfully!");
  }
}
