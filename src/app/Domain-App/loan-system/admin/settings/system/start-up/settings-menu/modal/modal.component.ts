import {Component, Input, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() editContent!: WritableSignal<boolean>;
}
