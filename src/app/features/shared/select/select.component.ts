import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'lh-select',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: string[] = []; // Options passed from parent
  @Input() selected: string | null = null; // Default selected value
  @Output() selectedChange = new EventEmitter<string>(); // Notify parent

  isOpen = false;

  ngOnInit() {
    if (!this.selected && this.options.length > 0) {
      this.selected = this.options[0]; // fallback
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selected = option;
    this.isOpen = false;
    this.selectedChange.emit(option);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null) {
    // ✅ Ensure target is an HTMLElement before using DOM methods
    if (!(target instanceof HTMLElement)) return;

    const clickedInside = target.closest('.choices-wrapper');
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
}
