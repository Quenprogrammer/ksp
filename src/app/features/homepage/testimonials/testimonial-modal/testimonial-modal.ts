import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonial-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonial-modal.html',
  styleUrls: ['./testimonial-modal.css']
})
export class TestimonialModalComponent {
  @Input() showModal = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitTestimonial = new EventEmitter<any>();

  testimonial = {
    name: '',
    email: '',
    product: '',
    rating: 0,
    title: '',
    text: '',
    imageUrl: ''
  };

  // Available products
// In testimonial-modal.component.ts
  products = [
    'Ankara Fusion Collection',
    'Afrobeat Producer Pack',
    'Content Creator Masterclass',
    'Lagos Collection 2024',
    'Edofication Cultural Line',
    'Home Studio Starter Kit',
    'Aso Oke Modern Collection',
    'Igbo Heritage Prints',
    'Hausa Modern Collection',
    'Advanced Mixing Course',
    'Cultural Storytelling Workshop',
    'Sustainable Adire Collection',
    'Naija Streetwear Line',
    'Afro-jazz Instrument Pack',
    'Video Production Toolkit',
    'Traditional Accessories',
    'Digital Marketing Course',
    'Other'
  ];
  setRating(rating: number): void {
    this.testimonial.rating = rating;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitTestimonial.emit({...this.testimonial});
      this.resetForm();
    } else {
      alert('Please fill all required fields and select a rating');
    }
  }

  onClose(): void {
    this.closeModal.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.testimonial = {
      name: '',
      email: '',
      product: '',
      rating: 0,
      title: '',
      text: '',
      imageUrl: ''
    };
  }

  private isFormValid(): boolean {
    return !!this.testimonial.name &&
      !!this.testimonial.product &&
      this.testimonial.rating > 0 &&
      !!this.testimonial.title &&
      !!this.testimonial.text;
  }

  // Get avatar preview (first letter of name)
  getAvatarPreview(): string {
    return this.testimonial.name ? this.testimonial.name.charAt(0).toUpperCase() : '?';
  }

  // Generate color based on name
  getAvatarColor(): string {
    if (!this.testimonial.name) return '#667eea';

    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
      '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'
    ];
    const index = this.testimonial.name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
