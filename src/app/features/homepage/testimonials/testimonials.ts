import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { TestimonialModalComponent } from '../testimonials/testimonial-modal/testimonial-modal';

interface Testimonial {
  title: string;
  text: string;
  name: string;
  product: string;
  avatar?: string;
  rating: number;
  createdAt?: any;
  imageUrl?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule, TestimonialModalComponent],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  private firestore = inject(Firestore);

  showModal = false;

  reviews: Testimonial[] = [
    {
      title: 'My Go-To Fashion Inspiration!',
      text: 'anamunusStyles23 has completely transformed my wardrobe! The Afro-fusion pieces are not just stylish but tell a story of our rich heritage. I wear them to every fashion event in Lagos. 🇳🇬✨',
      name: 'Chioma Adebayo',
      product: 'Ankara Fusion Collection',
      avatar: '',
      rating: 5
    },
    {
      title: 'Music Production Game Changer',
      text: 'As an upcoming Afrobeat producer in Abuja, the production tutorials and sample packs from anamunusStyles23 have elevated my sound. The traditional instrument samples are pure gold! 🎶🔥',
      name: 'Chinedu Okonkwo',
      product: 'Afrobeat Producer Pack',
      avatar: '',
      rating: 5
    },
    {
      title: 'Content Creation Made Easy',
      text: 'The content creation workshops in Port Harcourt taught me professional photography and storytelling. My Instagram page has grown from 500 to 10k followers in 3 months! 📸💫',
      name: 'Amina Yusuf',
      product: 'Content Creator Masterclass',
      avatar: 'assets/img/testimonials/amina.jpg',
      rating: 5
    },
    {
      title: 'Perfect for Lagos Fashion Week',
      text: 'Wore anamunusStyles23 designs to Lagos Fashion Week and got featured in Vogue! The attention to detail and quality is unmatched. Everyone was asking where I got my outfit from. 👗🌟',
      name: 'Oluwatobi Balogun',
      product: 'Lagos Collection 2024',
      avatar: '',
      rating: 5
    },
    {
      title: 'From Benin to the World',
      text: 'As a cultural content creator from Benin City, anamunusStyles23 has given me a platform to share our traditions globally. The Edofication collection is absolutely breathtaking! 🌍❤️',
      name: 'Efe Omoregie',
      product: 'Edofication Cultural Line',
      avatar: '',
      rating: 5
    },
    {
      title: 'Studio Quality on a Budget',
      text: 'The music production equipment recommendations helped me set up my home studio in Ibadan without breaking the bank. The sound quality is professional grade! 🎧🏠',
      name: 'Segun Adewale',
      product: 'Home Studio Starter Kit',
      avatar: 'assets/img/testimonials/segun.jpg',
      rating: 5
    },
    {
      title: 'Yoruba Heritage Reimagined',
      text: 'The Aso Oke modern collection blends tradition with contemporary fashion perfectly. I wore it to my sister\'s traditional wedding in Oyo and felt like royalty! 👑💃',
      name: 'Folake Johnson',
      product: 'Aso Oke Modern Collection',

      rating: 5
    },
    {
      title: 'Igbo Prints, Global Appeal',
      text: 'As a fashion designer in Enugu, the Igbo-inspired prints from anamunusStyles23 have international clients flocking to my boutique. The quality is exceptional! 🌟👗',
      name: 'Ngozi Eze',
      product: 'Igbo Heritage Prints',

      rating: 5
    },
    {
      title: 'Hausa Elegance Redefined',
      text: 'The modern interpretations of traditional Hausa attire are stunning. I wore the collection to a diplomatic event in Abuja and received countless compliments! 🕌✨',
      name: 'Fatima Bello',
      product: 'Hausa Modern Collection',

      rating: 5
    },
    {
      title: 'Nigerian Music, Global Standards',
      text: 'The mixing and mastering courses have taken my Afrobeats production from local to global standard. Now working with international artists! 🌎🎵',
      name: 'Dayo Akindele',
      product: 'Advanced Mixing Course',

      rating: 5
    },
    {
      title: 'Content That Connects Cultures',
      text: 'The storytelling techniques I learned have helped me create content that resonates both locally in Calabar and with the diaspora community. Powerful platform! 📱🌍',
      name: 'Mfoniso Ukpong',
      product: 'Cultural Storytelling Workshop',
      avatar: 'assets/img/testimonials/mfoniso.jpg',
      rating: 5
    },
    {
      title: 'Sustainable Fashion Champion',
      text: 'The eco-friendly Adire collection from Abeokuta is not just beautiful but sustainable. Proud to support local artisans through anamunusStyles23! 🌿👘',
      name: 'Temitope Olanrewaju',
      product: 'Sustainable Adire Collection',

      rating: 5
    }
  ];

  openTestimonialForm(): void {
    this.showModal = true;
  }

  handleCloseModal(): void {
    this.showModal = false;
  }

  async handleSubmitTestimonial(testimonialData: any): Promise<void> {
    try {
      // Get avatar URL or create fallback
      const avatar = testimonialData.imageUrl || this.getAvatarFallback(testimonialData.name);

      const testimonial: Testimonial = {
        name: testimonialData.name,

        product: testimonialData.product,
        rating: Number(testimonialData.rating),
        title: testimonialData.title,
        text: testimonialData.text,
        avatar: avatar,
        imageUrl: testimonialData.imageUrl,
        createdAt: Timestamp.now()
      };

      // Save to Firestore
      const testimonialsCollection = collection(this.firestore, 'testimonials');
      await addDoc(testimonialsCollection, testimonial);

      // Show success message
      alert('Thank you for your testimonial! It has been submitted successfully.');

      // Close modal
      this.handleCloseModal();

      // Optional: Add to local array for immediate display
      // this.reviews.unshift(testimonial);

    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('There was an error submitting your testimonial. Please try again.');
    }
  }

  getAvatarFallback(name: string): string {
    // In a real app, you would generate a proper avatar URL
    // For now, we'll use a placeholder
    const color = this.getAvatarColor(name);
    const initial = name.charAt(0).toUpperCase();
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${color}"/><text x="50" y="65" font-size="60" text-anchor="middle" fill="white">${initial}</text></svg>`;
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
      '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
