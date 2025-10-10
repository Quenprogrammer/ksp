import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import gsap from "gsap";
import {interval, Subscription} from "rxjs";
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  image: string;
}
@Component({
  selector: 'tbr-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, OnDestroy {

  rect: DOMRect | any;
  mouse = {x: 0, y: 0, moved: false};

  constructor(private elementRef: ElementRef) {
  }



  ngAfterViewInit(): void {
    this.rect = this.elementRef.nativeElement?.querySelector('#container-Parallax').getBoundingClientRect();
    console.log(this.rect)
    this.elementRef.nativeElement.querySelector('#container-Parallax').addEventListener('mousemove', (e: any) => {
      this.mouse.moved = true;
      this.mouse.x = e.clientX - this.rect.left;
      this.mouse.y = e.clientY - this.rect.top;
    });
    let mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      gsap.ticker.add(() => {
        if (this.mouse.moved) {
          this.parallaxIt(".slide-testimonial", 10);
          this.parallaxItX(".img-fluid-testimonial", -5);
        }
        this.mouse.moved = false;
      });
    });
    window.addEventListener('resize', this.updateRect.bind(this));
    window.addEventListener('scroll', this.updateRect.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateRect.bind(this));
    window.removeEventListener('scroll', this.updateRect.bind(this));
    this.subscription?.unsubscribe();
  }

  updateRect(): void {
    this.rect = this.elementRef.nativeElement.querySelector('#container').getBoundingClientRect();
  }

  parallaxIt(target: string, movement: number): void {
    gsap.to(target, {
      duration: 0.5,
      x: (this.mouse.x - this.rect.width / 2) / this.rect.width * movement,
      y: (this.mouse.y - this.rect.height / 2) / this.rect.height * movement
    });
  }

  parallaxItX(target: string, movement: number): void {
    gsap.to(target, {
      duration: 0.5,
      x: (this.mouse.y - this.rect.width / 2) / this.rect.width * movement,
      y: (this.mouse.x - this.rect.height / 2) / this.rect.height * movement
    });
  }
  testimonials: Testimonial[] = [
    {
      quote: "I got a business loan that allowed me to expand my store and increase profits. The repayment terms were flexible and interest was affordable.",
      name: "John D.",
      role: "Small Business Owner",
      avatar: "./assets/img/160x160/img8.jpg",
      image: "loanSystemIcons/testimonial/img.png"
    },

    {
      quote: "The repayment plan was easy to manage and the customer service team was available whenever I had questions.",
      name: "Mary K.",
      role: "Entrepreneur",
      avatar: "./assets/img/160x160/img9.jpg",
      image: "loanSystemIcons/testimonial/img1.jpg"
    },
    {
      quote: "Thanks to the agricultural loan, I was able to buy more seeds and fertilizers, and my farm yield doubled this year.",
      name: "Ahmed T.",
      role: "Farmer",
      avatar: "./assets/img/160x160/img3.jpg",
      image: "loanSystemIcons/testimonial/img11.jpg"
    },
    {
      quote: "Quick loan approval helped me restock my shop during the busiest season without stress.",
      name: "Fatima S.",
      role: "Retailer",
      avatar: "./assets/img/160x160/img10.jpg",
      image: "loanSystemIcons/testimonial/img16.jpg"
    },
    {
      quote: "I got a business loan that allowed me to expand my store and increase profits. The repayment terms were flexible and interest was affordable.",
      name: "John D.",
      role: "Small Business Owner",
      avatar: "./assets/img/160x160/img8.jpg",
      image: "loanSystemIcons/testimonial/img_3.png"
    },
    {
      quote: "Flexible repayment schedules made it easy for me to balance my loan alongside my daily expenses.",
      name: "Emeka C.",
      role: "Trader",
      avatar: "./assets/img/160x160/img11.jpg",
      image: "loanSystemIcons/testimonial/img_1.png"
    },
    {
      quote: "Excellent support and fast disbursement allowed my small farm to thrive beyond expectations.",
      name: "Aisha L.",
      role: "Agricultural Entrepreneur",
      avatar: "./assets/img/160x160/img12.jpg",
      image: "loanSystemIcons/testimonial/img_2.png"
    }
  ];

  currentIndex = 0;
  currentTestimonial: Testimonial = this.testimonials[0];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(10000).subscribe(() => {
      this.nextTestimonial();
    });
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.currentTestimonial = this.testimonials[this.currentIndex];
  }


}
