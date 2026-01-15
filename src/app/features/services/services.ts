
import {NgForOf, NgIf} from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
  color: string;
  packages?: ServicePackage[];
  stats?: ServiceStat[];
}

interface ServicePackage {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface ServiceStat {
  value: string;
  label: string;
}

interface Client {
  name: string;
  logo: string;
  testimonial: string;
  industry: string;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}
@Component({
  selector: 'app-services',
    imports: [
        NgForOf,
        NgIf,
      CommonModule, ReactiveFormsModule,FormsModule
    ],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
// Hero Section
  heroTitle = "Elevating Nigerian Creativity to Global Standards";
  heroSubtitle = "From Lagos to the world - Your one-stop platform for fashion, music, content, and unforgettable events";

  // Core Services
  services: Service[] = [
    {
      id: 'fashion',
      title: 'Fashion & Retail',
      tagline: 'Where Tradition Meets Contemporary Style',
      description: 'We bridge Nigerian cultural heritage with modern fashion trends through our physical stores and online platform. From Ankara to contemporary streetwear, we create and curate authentic Nigerian fashion.',
      features: [
        'Custom clothing design & production',
        'Physical stores in Lagos, Abuja, Port Harcourt',
        'E-commerce platform with nationwide delivery',
        'Personal styling & wardrobe consultation',
        'Bulk orders for corporate & events',
        'Afro-fusion collections quarterly'
      ],
      icon: 'bi-shop-window',
      image: 'assets/img/home/fashion/v2/hero/image.png',
      color: 'fashion',
      packages: [
        {
          name: 'Basic Styling',
          price: '₦25,000',
          period: 'per session',
          features: ['Personal consultation', 'Wardrobe audit', 'Shopping guide']
        },
        {
          name: 'Premium Design',
          price: '₦150,000',
          period: 'per outfit',
          features: ['Custom design', 'Premium fabrics', '3 fittings', 'Express delivery'],
          popular: true
        },
        {
          name: 'Corporate Package',
          price: '₦500,000',
          period: 'per team',
          features: ['Uniform design', 'Bulk production', 'Brand integration', 'Year-round support']
        }
      ],
      stats: [
        { value: '5,000+', label: 'Designs Created' },
        { value: '3', label: 'Store Locations' },
        { value: '50+', label: 'Designers' },
        { value: '98%', label: 'Client Satisfaction' }
      ]
    },
    {
      id: 'music',
      title: 'Music Production',
      tagline: 'Crafting the Sound of New Africa',
      description: 'State-of-the-art recording studios in Lagos producing the next generation of Afrobeats hits. We discover, develop, and distribute Nigerian musical talent globally.',
      features: [
        'Professional recording & mixing studios',
        'Afrobeats production & sound engineering',
        'Artist development & management',
        'Music distribution to all platforms',
        'Live session musicians available',
        'Music video production'
      ],
      icon: 'bi-music-note-beamed',
      image: 'assets/img/services/music-studio.jpg',
      color: 'music',
      packages: [
        {
          name: 'Studio Session',
          price: '₦50,000',
          period: 'per hour',
          features: ['Professional engineer', 'Recording equipment', 'Basic mixing']
        },
        {
          name: 'Full Production',
          price: '₦500,000',
          period: 'per track',
          features: ['Complete production', 'Mixing & mastering', 'Session musicians', 'Distribution'],
          popular: true
        },
        {
          name: 'Artist Development',
          price: '₦2,000,000',
          period: '3 months',
          features: ['Brand development', 'EP production', 'Marketing strategy', 'Tour support']
        }
      ],
      stats: [
        { value: '200+', label: 'Artists Produced' },
        { value: '5M+', label: 'Streams Generated' },
        { value: '2', label: 'Recording Studios' },
        { value: '15', label: 'Platinum Records' }
      ]
    },
    {
      id: 'content',
      title: 'Content Creation & Blog',
      tagline: 'Telling Authentic Nigerian Stories',
      description: 'Our digital media arm creates compelling content that showcases Nigerian culture, fashion, music, and lifestyle. We help brands connect with audiences through authentic storytelling.',
      features: [
        'Professional photography & videography',
        'Social media content strategy',
        'Blog & editorial content creation',
        'Influencer marketing campaigns',
        'Brand storytelling & documentaries',
        'Digital marketing & SEO'
      ],
      icon: 'bi-camera-video',
      image: 'assets/img/services/content-studio.jpg',
      color: 'content',
      packages: [
        {
          name: 'Content Package',
          price: '₦100,000',
          period: 'per month',
          features: ['10 social media posts', '2 blog articles', 'Basic photography']
        },
        {
          name: 'Brand Campaign',
          price: '₦750,000',
          period: 'campaign',
          features: ['Complete strategy', 'Video production', 'Influencer outreach', 'Analytics'],
          popular: true
        },
        {
          name: 'Enterprise Solution',
          price: '₦2,500,000',
          period: 'quarterly',
          features: ['Dedicated team', 'Multi-platform strategy', 'Performance marketing', 'Monthly reports']
        }
      ],
      stats: [
        { value: '500K+', label: 'Social Followers' },
        { value: '1M+', label: 'Monthly Views' },
        { value: '50+', label: 'Brand Partners' },
        { value: '200%', label: 'Avg. Engagement Growth' }
      ]
    },
    {
      id: 'events',
      title: 'Event Hosting & Production',
      tagline: 'Creating Unforgettable Experiences',
      description: 'From intimate fashion shows to large-scale concerts, we produce memorable events that celebrate Nigerian culture and create lasting impressions.',
      features: [
        'Fashion shows & runway events',
        'Music concerts & festivals',
        'Corporate events & product launches',
        'Weddings & cultural celebrations',
        'Event planning & management',
        'Full production services'
      ],
      icon: 'bi-calendar-event',
      image: 'assets/img/services/event-production.jpg',
      color: 'events',
      packages: [
        {
          name: 'Basic Event',
          price: '₦500,000',
          period: 'per event',
          features: ['Venue booking', 'Basic decor', 'Event coordination']
        },
        {
          name: 'Premium Production',
          price: '₦5,000,000',
          period: 'per event',
          features: ['Full production', 'Entertainment booking', 'Marketing', 'VIP management'],
          popular: true
        },
        {
          name: 'Festival Package',
          price: '₦20,000,000',
          period: 'per festival',
          features: ['Multi-day event', 'International artists', 'Sponsor management', 'Broadcast rights']
        }
      ],
      stats: [
        { value: '120+', label: 'Events Hosted' },
        { value: '50,000+', label: 'Total Attendees' },
        { value: '100%', label: 'Event Success Rate' },
        { value: '4.9/5', label: 'Client Rating' }
      ]
    }
  ];

  // Integrated Solutions
  integratedSolutions = [
    {
      title: 'Fashion + Music',
      description: 'Runway shows with live Afrobeats performances',
      icon: 'bi-mic-mute'
    },
    {
      title: 'Content + Events',
      description: 'Event coverage turned into compelling digital content',
      icon: 'bi-camera-reels'
    },
    {
      title: 'Retail + Experiences',
      description: 'In-store events that drive sales and community',
      icon: 'bi-people'
    },
    {
      title: 'Brand + Culture',
      description: 'Authentic Nigerian storytelling for global brands',
      icon: 'bi-globe'
    }
  ];

  // Our Process
  processSteps: ProcessStep[] = [
    {
      number: 1,
      title: 'Discovery',
      description: 'We understand your vision, goals, and cultural context',
      icon: 'bi-search'
    },
    {
      number: 2,
      title: 'Concept Development',
      description: 'Creative brainstorming and strategy formulation',
      icon: 'bi-lightbulb'
    },
    {
      number: 3,
      title: 'Execution',
      description: 'Professional implementation with attention to detail',
      icon: 'bi-gear'
    },
    {
      number: 4,
      title: 'Delivery & Support',
      description: 'Timely delivery with ongoing support and optimization',
      icon: 'bi-check-circle'
    }
  ];

  // Client Portfolio
  clients: Client[] = [
    {
      name: 'Lagos Fashion Week',
      logo: 'assets/img/clients/lfw.png',
      testimonial: 'Professional production and seamless execution for our largest show yet.',
      industry: 'Fashion'
    },
    {
      name: 'MTN Nigeria',
      logo: 'assets/img/clients/mtn.png',
      testimonial: 'Creative content strategy that increased our youth engagement by 300%.',
      industry: 'Telecommunications'
    },
    {
      name: 'Burna Boy',
      logo: 'assets/img/clients/burna.png',
      testimonial: 'World-class production for our album launch event.',
      industry: 'Music'
    },
    {
      name: 'African Fashion Foundation',
      logo: 'assets/img/clients/aff.png',
      testimonial: 'Exceptional platform for showcasing emerging African designers.',
      industry: 'Fashion'
    }
  ];

  // Service Stats
  companyStats = [
    { value: '4', label: 'Integrated Services', icon: 'bi-layers' },
    { value: '150+', label: 'Projects Completed', icon: 'bi-check2-circle' },
    { value: '98%', label: 'Client Satisfaction', icon: 'bi-emoji-smile' },
    { value: '₦500M+', label: 'Revenue Generated', icon: 'bi-cash-stack' },
    { value: '50+', label: 'Team Members', icon: 'bi-people' },
    { value: '24/7', label: 'Support Available', icon: 'bi-clock' }
  ];

  // Active Service
  activeService: Service = this.services[0];

  setActiveService(service: Service): void {
    this.activeService = service;
  }

  // Get service color class
  getServiceColorClass(color: string): string {
    const colorClasses: { [key: string]: string } = {
      'fashion': 'bg-fashion',
      'music': 'bg-music',
      'content': 'bg-content',
      'events': 'bg-events'
    };
    return colorClasses[color] || 'bg-primary';
  }

  // Get service text color
  getServiceTextColor(color: string): string {
    const textClasses: { [key: string]: string } = {
      'fashion': 'text-fashion',
      'music': 'text-music',
      'content': 'text-content',
      'events': 'text-events'
    };
    return textClasses[color] || 'text-primary';
  }

  // Get service border color
  getServiceBorderColor(color: string): string {
    const borderClasses: { [key: string]: string } = {
      'fashion': 'border-fashion',
      'music': 'border-music',
      'content': 'border-content',
      'events': 'border-events'
    };
    return borderClasses[color] || 'border-primary';
  }

  // Contact form data
  inquiryData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  };

  submitted = false;

  onSubmit(): void {
    console.log('Service inquiry:', this.inquiryData);
    this.submitted = true;

    setTimeout(() => {
      this.submitted = false;
      this.inquiryData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      };
    }, 3000);
  }
}
