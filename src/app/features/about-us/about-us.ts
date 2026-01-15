import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  tribe: string;
  location: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  // Company info
  companyName = 'anamunusStyles23';
  companyTagline = 'Where Kano Tradition Meets Contemporary Style';
  companyDescription = 'From our humble beginnings in Kano State, we have grown from a small fashion store into a comprehensive creative hub. We specialize in clothing, trousers, caps, shirts, and shoes, while also expanding into music production and event hosting.';

  // Company Stats
  companyStats = [
    { value: '5+', label: 'Years in Business', description: 'Serving Kano since 2019' },
    { value: '10K+', label: 'Happy Customers', description: 'Across Northern Nigeria' },
    { value: '3', label: 'Business Verticals', description: 'Fashion, Music, Events' },
    { value: '98%', label: 'Satisfaction Rate', description: 'Customer happiness' }
  ];

  // Our Products
  products = [
    { name: 'Clothes', description: 'Traditional & modern Nigerian wear', icon: 'aboutUs/img_3.webp' },
    { name: 'Trousers', description: 'Custom-fit trousers for all occasions', icon: 'aboutUs/img_1.webp' },
    { name: 'Caps', description: 'Trendy caps & traditional headwear', icon: 'aboutUs/img_2.webp' },
    { name: 'Shirts', description: 'Quality shirts for work & leisure', icon: 'aboutUs/img.webp' },
    { name: 'Shoes', description: 'Comfortable footwear for every need', icon: 'aboutUs/img_4.webp' },
    { name: 'Accessories', description: 'Complete your look with our accessories', icon: 'homepage/chain.webp' }
  ];

  // Our Services
  services = [
    { name: 'Fashion Store', description: 'Physical store in Kano with nationwide delivery', icon: 'bi-shop' },
    { name: 'Custom Tailoring', description: 'Personalized clothing design and fitting', icon: 'bi-scissors' },
    { name: 'Music Production', description: 'Recording studio for local artists', icon: 'bi-music-note-beamed' },
    { name: 'Event Hosting', description: 'Organizing cultural and music events', icon: 'bi-calendar-event' },
    { name: 'Content Creation', description: 'Photography & social media content', icon: 'bi-camera' },
    { name: 'Artiste Management', description: 'Developing and promoting local talent', icon: 'bi-people' }
  ];

  // Our Team
  teamMembers: TeamMember[] = [
    {
      name: 'Aminu Sani',
      role: 'Founder & CEO',
      bio: 'Started with a small shop in Sabon Gari, Kano. Passionate about promoting Northern Nigerian fashion globally.',
      avatar: 'assets/img/team/aminu.jpg',
      tribe: 'Hausa',
      location: 'Kano State'
    },
    {
      name: 'Fatima Abubakar',
      role: 'Head of Fashion',
      bio: 'Graduate of Kano Fashion Institute. Expert in blending traditional Hausa attire with modern styles.',
      avatar: 'assets/img/team/fatima.jpg',
      tribe: 'Hausa',
      location: 'Kano'
    }
  ];

  // Our Values
  values: Value[] = [
    {
      icon: 'bi-people',
      title: 'Community Focused',
      description: 'We believe in building and supporting our local Kano community first.'
    },
    {
      icon: 'bi-star',
      title: 'Quality Craftsmanship',
      description: 'Every piece is made with attention to detail and traditional techniques.'
    },
    {
      icon: 'bi-heart',
      title: 'Cultural Preservation',
      description: 'We modernize traditional designs while respecting cultural heritage.'
    },
    {
      icon: 'bi-lightbulb',
      title: 'Innovation',
      description: 'Constantly evolving to bring fresh perspectives to Nigerian fashion.'
    }
  ];

  // Our Journey
  milestones: Milestone[] = [
    {
      year: '2019',
      title: 'Humble Beginnings',
      description: 'Started as a small boutique in Sabon Gari, Kano selling traditional clothing.'
    },
    {
      year: '2020',
      title: 'Expanded Product Line',
      description: 'Added trousers, caps, shirts, and shoes to our collection.'
    },
    {
      year: '2021',
      title: 'Online Presence',
      description: 'Launched e-commerce platform to serve customers across Nigeria.'
    },
    {
      year: '2022',
      title: 'Music Division',
      description: 'Started music production studio to support local artists.'
    },
    {
      year: '2023',
      title: 'Event Hosting',
      description: 'Began organizing cultural events and fashion shows in Kano.'
    },
    {
      year: '2024',
      title: 'Growth & Expansion',
      description: 'Plans to open new branches across Northern Nigeria.'
    }
  ];

  // Contact Form
  contactData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: ''
  };

  submitted = false;

  // Social Media
  socialLinks = [
    { platform: 'Instagram', icon: 'bi-instagram', url: '#', handle: '@anamunusStyles23' },
    { platform: 'Facebook', icon: 'bi-facebook', url: '#', handle: 'anamunusStyles23' },
    { platform: 'Twitter', icon: 'bi-twitter', url: '#', handle: '@anamunusStyles' },
    { platform: 'YouTube', icon: 'bi-youtube', url: '#', handle: 'anamunusStyles TV' },
    { platform: 'WhatsApp', icon: 'bi-whatsapp', url: '#', handle: '+234 809 123 4567' }
  ];

  // Newsletter
  newsletterEmail = '';

  onSubmit(): void {
    console.log('Contact form submitted:', this.contactData);
    this.submitted = true;

    setTimeout(() => {
      this.submitted = false;
      this.contactData = {
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: ''
      };
    }, 3000);
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail) {
      alert(`Thank you for subscribing with: ${this.newsletterEmail}`);
      this.newsletterEmail = '';
    }
  }

  // Get Kano background color
  getKanoColor(): string {
    return 'bg-kano';
  }

  // Get product category color
  getProductColor(index: number): string {
    const colors = ['fashion', 'music', 'events', 'content'];
    return colors[index % colors.length];
  }
}
