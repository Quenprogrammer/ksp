import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
interface FeaturedGalleryItem {
  image: string;
  badge: string;
  title: string;
  category: string;
  description: string;
  price?: string;
  type: 'fashion' | 'music' | 'content' | 'editorial';
  tags: string[];
}

@Component({
  selector: 'app-events',
  imports: [
    CommonModule
  ],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class EventsComponent {
  recipes = [
    {
      image: 'event/img.webp',
      title: 'Spring/Summer 2024 Collection Launch',
      date: 'March 15, 2024 | 7:00 PM',
      category: 'Fashion Show',
      attendees: '500+ Expected',
      tags: ['Studio', 'Collaboration', 'Process'],
      description: 'Experience the unveiling of our latest collection blending urban streetwear with haute couture. Live DJ performance by Luna Beat.',
      featured: true,

    },
    {
      image: 'event/img_1.webp',
      title: 'Electric Dreams: Underground Music Night',
      date: 'March 22, 2024 | 9:00 PM',
      category: 'Music Production',
      attendees: '300+ Expected',
      tags: ['Fashion', 'Photography', 'Editorial', 'Music', 'Production',],
      description: 'An immersive audio-visual experience featuring emerging electronic music producers. Perfect for content categorys seeking unique footage.'
    },
    {
      image: 'event/img_2.webp',
      title: 'Content Creation Masterclass',
      date: 'March 28, 2024 | 2:00 PM',
      category: 'Workshop',
      attendees: '50 Spots Available',
      tags: ['Fashion', 'Photography', 'Editorial'],
      description: 'Learn professional photography, video editing, and social media strategy from industry-leading content categorys.'
    },

    {
      image: 'event/img_6.webp',
      title: 'Producers Lab: Beat Making Session',
      date: 'April 12, 2024 | 6:00 PM',
      category: 'Workshop',
      attendees: 'Limited to 25',
      tags: [ 'Photography',  'Music', 'Production',],
      description: 'Hands-on workshop for aspiring music producers. Bring your laptop and learn production techniques from Grammy-nominated artists.'
    },
    {
      image: 'event/img_5.webp',
      tags: ['Content', 'Social Media', 'Editing'],
      title: 'Instagram Reels Challenge',
      date: 'April 19, 2024 | All Day',
      category: 'Digital Event',
      attendees: 'Unlimited',
      description: '24-hour creative challenge with prizes for best fashion, music, and lifestyle content. Use #anamunusStyles23 to participate.'
    },
    {
      image: 'event/img_4.webp',
      title: 'VIP Couture Fitting Experience',
      date: 'April 26, 2024 | By Appointment',
      category: 'Private Event',
      attendees: 'Exclusive',
      tags: ['Content', 'Social Media', 'Editing'],
      description: 'Personalized styling session with our lead designers. Includes professional photoshoot and custom alterations.'
    },
    {
      image: 'event/img_7.webp',
      tags: ['Content', 'Social Media', 'Editing'],
      title: 'Soundscape: Live Ambient Music',
      date: 'May 3, 2024 | 8:00 PM',
      category: 'Live Performance',
      attendees: '150 Capacity',
      description: 'Soothing ambient music performances in our specially designed acoustic space. Perfect for relaxation and creative inspiration.'
    }
  ];


  featuredItems: FeaturedGalleryItem[] = [
    {
      image: 'event/img.webp',
      badge: 'Editorial',
      title: 'Spring 2024: Urban Elegance Collection',
      category: 'Photographer: Elena Vasquez',
      description: 'Exclusive editorial showcasing our latest streetwear-meets-couture collection. Shot in downtown industrial spaces with dramatic lighting and urban aesthetics.',
      type: 'editorial',
      tags: ['Fashion', 'Photography', 'Editorial']
    },
    {
      image: 'event/img_1.webp',
      badge: 'Music Production',
      title: 'Sound Design Masterclass',
      category: 'Producer: DJ Chroma',
      description: 'Behind-the-scenes look at creating atmospheric soundscapes for fashion runways. Learn production techniques from industry-leading electronic music categorys.',
      type: 'music',
      tags: ['Music', 'Production', 'Workshop']
    },
    {
      image: 'event/img_2.webp',
      badge: 'Content Creation',
      title: 'Digital Storytelling Workshop',
      category: 'Content Director: Maya Rodriguez',
      description: 'Master the art of visual storytelling for social media. From concept development to post-production editing techniques.',
      type: 'content',
      tags: ['Content', 'Social Media', 'Editing']
    },
    {
      image: 'event/img_3.webp',
      badge: 'Fashion Event',
      title: 'Nightfall: Runway Extravaganza',
      category: 'Creative Director: Marcus Chen',
      description: 'Immersive fashion experience combining wearable technology with avant-garde designs. Live musical accompaniment by emerging artists.',
      type: 'fashion',
      tags: ['Runway', 'Technology', 'Performance']
    },
    {
      image: 'event/img_4.webp',
      badge: 'Behind the Scenes',
      title: 'Studio Sessions Vol. 1',
      category: 'Various Artists',
      description: 'Intimate look at creative processes in our studio. Featuring fashion designers, musicians, and digital artists collaborating on new projects.',
      type: 'editorial',
      tags: ['Studio', 'Collaboration', 'Process']
    }
  ];

  currentIndex = 0;
  autoSlideInterval: any;
  isAutoSliding = true;
  slideDirection: 'next' | 'prev' = 'next';

  ngOnInit(): void {
    this.startAutoSlide();
  }

  get currentItem(): FeaturedGalleryItem {
    return this.featuredItems[this.currentIndex];
  }

  get badgeClass(): string {
    const typeClasses = {
      'editorial': 'bg-dark',
      'fashion': 'bg-fashion',
      'music': 'bg-music',
      'content': 'bg-content'
    };
    return typeClasses[this.currentItem.type] || 'bg-secondary';
  }

  nextSlide(): void {
    this.slideDirection = 'next';
    this.currentIndex = (this.currentIndex + 1) % this.featuredItems.length;
  }

  prevSlide(): void {
    this.slideDirection = 'prev';
    this.currentIndex = (this.currentIndex - 1 + this.featuredItems.length) % this.featuredItems.length;
  }

  goToSlide(index: number): void {
    this.slideDirection = index > this.currentIndex ? 'next' : 'prev';
    this.currentIndex = index;
  }

  startAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.autoSlideInterval = setInterval(() => {
      if (this.isAutoSliding) {
        this.nextSlide();
      }
    }, 5000); // Change every 5 seconds
  }

  toggleAutoSlide(): void {
    this.isAutoSliding = !this.isAutoSliding;
    if (this.isAutoSliding) {
      this.startAutoSlide();
    } else {
      clearInterval(this.autoSlideInterval);
    }
  }

  onMouseEnter(): void {
    if (this.isAutoSliding) {
      clearInterval(this.autoSlideInterval);
    }
  }

  onMouseLeave(): void {
    if (this.isAutoSliding) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Get related items (excluding current)
  get relatedItems(): FeaturedGalleryItem[] {
    return this.featuredItems.filter((_, index) => index !== this.currentIndex);
  }

  // Format tags for display
  get formattedTags(): string {
    return this.currentItem.tags.join(' • ');
  }
}
