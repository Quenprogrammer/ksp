import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface InvestmentMetric {
  icon: string;
  value: string;
  label: string;
  growth?: string;
}

interface InvestmentTier {
  name: string;
  amount: string;
  description: string;
  benefits: string[];
  color: string;
  buttonText: string;
  available: boolean;
  currency?: string;
}

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
  state: string;
  tribe: string;
}

interface BusinessVertical {
  name: string;
  revenueShare: string;
  growth: string;
  description: string;
  icon: string;
}

interface NigerianMarketData {
  name: string;
  value: string;
  description: string;
}
@Component({
  selector: 'app-investment',
    imports: [
        FormsModule,
      CommonModule, ReactiveFormsModule,FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './investment.html',
  styleUrl: './investment.css'
})
export class Investment {
  // Hero Section
  pageTitle = "Invest in Nigeria's Premier Creative Hub";
  pageSubtitle = "anamunusStyles23: Where Nigerian Fashion Meets Music, Events & Content Creation";

  // Business Verticals
  businessVerticals: BusinessVertical[] = [
    {
      name: 'Fashion Retail',
      revenueShare: '45%',
      growth: '+35% YoY',
      description: 'Physical & online store with authentic Nigerian designs',
      icon: 'bi-shop'
    },
    {
      name: 'Music Production',
      revenueShare: '25%',
      growth: '+60% YoY',
      description: 'Afrobeats studio, artist management & music distribution',
      icon: 'bi-music-note-beamed'
    },
    {
      name: 'Event Production',
      revenueShare: '20%',
      growth: '+40% YoY',
      description: 'Fashion shows, concerts & cultural festivals across Nigeria',
      icon: 'bi-calendar-event'
    }
  ];

  // Investment Metrics (Nigeria Focus)
  investmentMetrics: InvestmentMetric[] = [
    { icon: 'bi-graph-up-arrow', value: '₦1M', label: 'Annual Revenue', growth: '+55% YoY' },
    { icon: 'bi-people', value: '50K+', label: 'Active Customers', growth: '+15K in 2023' },
    { icon: 'bi-geo-alt', value: '6', label: 'Store Locations', growth: 'Lagos, Abuja, PH' },
    { icon: 'bi-trophy', value: '120+', label: 'Events Hosted', growth: '2023 Achievements' }
  ];

  // Nigerian Market Data
  nigerianMarket: NigerianMarketData[] = [
    { name: 'Fashion Market Size', value: '₦2.3T', description: 'Annual spending on fashion in Nigeria' },
    { name: 'Music Industry', value: '₦450B', description: 'Nigerian music industry valuation' },
    { name: 'Youth Population', value: '60%', description: 'Under 25 years old - target demographic' },
    { name: 'Digital Growth', value: '40% CAGR', description: 'E-commerce adoption rate in Nigeria' }
  ];

  // Investment Tiers (in Naira)
  investmentTiers: InvestmentTier[] = [
    {
      name: 'Seed Investor',
      amount: '₦10M - ₦50M',
      description: 'Early-stage expansion within Nigeria',
      benefits: [
        '5-8% equity stake',
        'Store naming rights in one location',
        'VIP access to all events',
        'Quarterly investor updates',
        'Exclusive fashion collections',
        'Meet Nigerian artists we manage'
      ],
      color: 'primary',
      buttonText: 'Express Interest',
      available: true,
      currency: 'NGN'
    },
    {
      name: 'Growth Partner',
      amount: '₦50M - ₦250M',
      description: 'Scale across West Africa',
      benefits: [
        '8-15% equity stake',
        'Board of directors seat',
        'Monthly performance reports',
        'Co-branding opportunities',
        'Revenue sharing from events',
        'Priority access to music releases',
        'Fashion line collaboration rights'
      ],
      color: 'success',
      buttonText: 'Schedule Meeting',
      available: true,
      currency: 'NGN'
    },
    {
      name: 'Strategic Investor',
      amount: '₦250M+',
      description: 'Lead pan-African creative expansion',
      benefits: [
        '15-25% equity stake',
        'Founder-level involvement',
        'Weekly strategic updates',
        'West African expansion rights',
        'IP sharing agreements',
        'M&A opportunities',
        'Global distribution rights',
        'Executive producer credits'
      ],
      color: 'warning',
      buttonText: 'Contact CEO',
      available: true,
      currency: 'NGN'
    }
  ];

  // Nigerian Leadership Team
  teamMembers: TeamMember[] = [
    {
      name: 'Samuel',
      role: 'CEO & Creative Director',
      expertise: 'Fashion Design & Brand Strategy',
      bio: 'Graduate of Lagos Fashion Academy. Built brand from single boutique to national chain. Featured in Vogue Africa.',
      image: 'assets/img/team/ngozi.jpg',
      state: 'Enugu State',
      tribe: 'Igbo'
    },
    {
      name: 'Chinedu Okonkwo',
      role: 'Head of Music & Events',
      expertise: 'Afrobeats Production & Entertainment',
      bio: 'Former producer for Burna Boy. Organized Lagos Fashion Week after-party for 5,000+ attendees.',
      image: 'assets/img/team/chinedu.jpg',
      state: 'Anambra State',
      tribe: 'Igbo'
    },

  ];

  // Store Locations
  storeLocations = [
    { city: 'Lagos', location: 'Victoria Island', size: '5,000 sq ft', opening: '2018' },
    { city: 'Abuja', location: 'Maitama', size: '3,500 sq ft', opening: '2020' },
    { city: 'Port Harcourt', location: 'GRA', size: '4,000 sq ft', opening: '2021' },
    { city: 'Ibadan', location: 'Bodija', size: '3,000 sq ft', opening: '2023' }
  ];

  // Upcoming Major Events
  upcomingEvents = [
    { name: 'Lagos Fashion Week 2024', date: 'Oct 2024', expectedAttendance: '10,000+' },
    { name: 'Afrobeats Festival Lagos', date: 'Dec 2024', expectedAttendance: '15,000+' },
    { name: 'Cultural Fashion Expo', date: 'Mar 2025', expectedAttendance: '8,000+' },
    { name: 'Content Creator Summit', date: 'Jun 2025', expectedAttendance: '5,000+' }
  ];

  // Financial Projections (Naira)
  financialProjections = [
    { year: 2024, revenue: '₦1.8B', growth: '50%', keyMilestone: 'Open 2 new stores in Ibadan & Kano' },
    { year: 2025, revenue: '₦3.0B', growth: '67%', keyMilestone: 'Launch West African expansion' },
    { year: 2026, revenue: '₦5.0B', growth: '67%', keyMilestone: 'Partner with international brands' },
    { year: 2027, revenue: '₦8.0B', growth: '60%', keyMilestone: 'List on Nigerian Stock Exchange' }
  ];

  // Contact Form
  investorData = {
    name: '',
    email: '',
    phone: '',
    investmentInterest: '',
    location: '',
    message: ''
  };

  submitted = false;

  // Nigerian Cultural Elements
  culturalAdvantages = [
    'Rich heritage of Nigerian fashion (Ankara, Adire, Aso Oke)',
    'Global popularity of Afrobeats music',
    'Large, youthful population with disposable income',
    'Growing middle class and urbanization',
    'Strong diaspora market for Nigerian culture',
    'Government support for creative industries'
  ];

  onSubmit(): void {
    console.log('Investor inquiry:', this.investorData);
    this.submitted = true;

    // In production, connect to backend
    setTimeout(() => {
      this.submitted = false;
      this.investorData = {
        name: '',
        email: '',
        phone: '',
        investmentInterest: '',
        location: '',
        message: ''
      };
    }, 3000);
  }

  // Calculate ROI in Naira
  calculateROI(investment: number, years: number = 5): string {
    const baseReturn = investment * 4; // Conservative 4x return
    if (baseReturn >= 1000000000) {
      return `₦${(baseReturn / 1000000000).toFixed(1)}B`;
    }
    return `₦${(baseReturn / 1000000).toFixed(1)}M`;
  }

  // Get current valuation
  get currentValuation(): string {
    return '₦5B';
  }

  // Get next funding round
  get nextRound(): string {
    return 'Series A - ₦750M';
  }

  // Calculate total customers
  get totalCustomers(): string {
    return '5,000+';
  }

  // Calculate social media reach
  get socialMediaReach(): string {
    return '10.5k+';
  }
}
