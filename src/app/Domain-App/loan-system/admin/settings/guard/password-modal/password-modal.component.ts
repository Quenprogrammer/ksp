import {Component, EventEmitter, Output, WritableSignal, signal, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, RouterLink, NgStyle],
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent {
  @Input() header: string="Authentication"
  @Input() headerColor: string="black"
  password: WritableSignal<string> = signal('');
  error = false;
  attemptCount: WritableSignal<number> = signal(0);
  maxAttempts: WritableSignal<number> = signal(5);
  isLocked = false;

  validPasswords: string[] = [];

  @Output() unlocked = new EventEmitter<boolean>();

  get passwordValue() {
    return this.password();
  }
  set passwordValue(val: string) {
    this.password.set(val);
  }

  submit(): void {
    if (this.isLocked) return;

    this.attemptCount.set(this.attemptCount() + 1);
    const isValid = this.validPasswords.includes(this.password());
    this.error = !isValid;
    this.unlocked.emit(isValid);

    if (!isValid && this.attemptCount() >= this.maxAttempts()) {
      this.isLocked = true;
    }
  }

  closeModal(): void {
    this.unlocked.emit(false);
  }

  open(passwords: string[]): void {
    this.validPasswords = passwords;
    this.password.set('');
    this.error = false;
    this.isLocked = false;
    this.attemptCount.set(0);
  }
}
