import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-home-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './home-products.html',
  styleUrl: './home-products.css',
})
export class HomeProducts {
  tabs = [
    { label: 'Best sellers', active: true },
    { label: 'New arrivals', active: false },
    { label: 'Sale items', active: false },
    { label: 'Top rated', active: false }
  ];

  products = [
    {
      id: 1,
      title: 'Premium Cotton Oxford Men\'s Shirt',
      category: 'shirts',
      price: '$89.99',
      oldPrice: '$120.00',
      sale: true,
      description: 'Crafted from 100% premium Egyptian cotton, this Oxford shirt features a comfortable regular fit that\'s perfect for both office wear and casual outings. The fabric is breathable and gets softer with every wash. Features include a button-down collar, single needle stitching throughout, and mother of pearl buttons that add a touch of sophistication. The subtle texture and substantial feel make it a versatile staple in any modern wardrobe.',
      coverImage: 'homepage/crazyshirt.webp',
      images: [
        'assets/img/fashion/shirts/01-detail-1.jpg',
        'assets/img/fashion/shirts/01-detail-2.jpg',
        'assets/img/fashion/shirts/01-detail-3.jpg'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      tags: ['casual', 'formal', 'cotton', 'oxford', 'officewear']
    },
    {
      id: 2,
      title: 'Slim Fit Performance Chino Trousers',
      category: 'trousers',
      price: '$75.50',
      description: 'These modern chinos combine style with functionality through innovative stretch fabric technology. Designed for all-day comfort, they feature a slim silhouette that flatters without restricting movement. The moisture-wicking properties keep you cool and dry, while the reinforced stitching at stress points ensures durability. Perfect for transitioning from office meetings to evening social events, they maintain their shape wash after wash and resist wrinkles naturally.',
      coverImage: 'blog/img_6.png',
      images: [
        'assets/img/fashion/trousers/01-detail-1.jpg',
        'assets/img/fashion/trousers/01-detail-2.jpg'
      ],
      sizes: ['28', '30', '32', '34', '36'],
      tags: ['casual', 'office', 'comfort', 'stretch', 'versatile']
    },
    {
      id: 3,
      title: 'Oversized Hooded Fleece Sweatshirt',
      category: 'hoods',
      price: '$65.00',
      oldPrice: '$85.00',
      sale: true,
      description: 'Embrace the oversized trend with this premium fleece hoodie that offers ultimate comfort and street-style credibility. Made from heavyweight 400gsm cotton French terry, it provides exceptional warmth without bulk. The roomy kangaroo pocket, adjustable drawstring hood, and ribbed cuffs create a cozy silhouette. Designed with a dropped shoulder construction for that perfect relaxed fit, this hoodie features reinforced stitching and a brushed interior for maximum softness against the skin.',
      coverImage: 'blog/img_5.png',
      images: [
        'assets/img/fashion/hoods/01-detail-1.jpg',
        'assets/img/fashion/hoods/01-detail-2.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      tags: ['streetwear', 'casual', 'comfort', 'oversized', 'winter']
    },
    {
      id: 4,
      title: 'Heritage Dad Cap with Genuine Leather Strap',
      category: 'caps',
      price: '$32.99',
      description: 'This meticulously crafted dad cap features premium 6-panel construction with a curved brim designed for optimal sun protection and style. The genuine leather strap with antique brass buckle allows for precise sizing while adding a touch of rustic elegance. Made from heavyweight cotton twill that maintains its shape, it features subtle tonal stitching and an embroidered logo that adds character without being overly branded. The moisture-wicking sweatband ensures comfort during extended wear.',
      coverImage: 'blog/img_3.png',
      images: [
        'assets/img/fashion/caps/01-detail-1.jpg',
        'assets/img/fashion/caps/01-detail-2.jpg'
      ],
      sizes: ['One Size'],
      tags: ['accessory', 'streetwear', 'unisex', 'leather', 'heritage']
    },
    {
      id: 5,
      title: 'Vintage Distressed Raw Hem Denim Jacket',
      category: 'jackets',
      price: '$125.00',
      description: 'Inspired by classic workwear but updated for contemporary style, this denim jacket features authentic distressing that tells a story. Each piece undergoes a unique washing process to create natural fading and subtle wear patterns that can\'t be replicated. The raw, unfinished hem adds an edgy touch while the custom antique brass hardware provides vintage appeal. Made from 14oz Japanese selvedge denim, it develops beautiful character over time and becomes uniquely yours with regular wear.',
      coverImage: 'blog/img_2.png',
      images: [
        'assets/img/fashion/jackets/01-detail-1.jpg',
        'assets/img/fashion/jackets/01-detail-2.jpg',
        'assets/img/fashion/jackets/01-detail-3.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      tags: ['vintage', 'denim', 'statement', 'raw', 'heritage']
    },
    {
      id: 6,
      title: 'Breathable Linen-Cotton Blend Camp Collar Shirt',
      category: 'shirts',
      price: '$55.00',
      oldPrice: '$70.00',
      sale: true,
      description: 'Perfect for warm weather and tropical getaways, this camp collar shirt is crafted from a luxurious blend of 70% linen and 30% cotton. The natural breathability of linen combined with cotton\'s softness creates a fabric that feels cool against the skin while developing beautiful natural wrinkles that add character. Featuring a relaxed fit, open camp collar, and two chest pockets with contrast stitching, this shirt embodies effortless summer style. The loose, flowing silhouette allows for maximum airflow and comfort.',
      coverImage: 'homepage/1e9501408177d1b359e5fac5050903ec.jpg',
      images: [
        'assets/img/fashion/shirts/02-detail-1.jpg',
        'assets/img/fashion/shirts/02-detail-2.jpg'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      tags: ['summer', 'linen', 'lightweight', 'beach', 'vacation']
    },
    {
      id: 7,
      title: 'Wool Blend Tailored Trouser with Satin Lining',
      category: 'trousers',
      price: '$110.00',
      description: 'Elevate your formal wardrobe with these impeccably tailored trousers crafted from a premium wool-viscose blend that drapes beautifully and resists wrinkles. The satin lining adds a luxurious touch while helping the trousers glide on smoothly. Featuring a mid-rise waist, clean front with hidden seam details, and a perfectly tapered leg that ends just above the shoe. The reinforced inner thigh and seat ensure durability, while the functional back welt pockets maintain the sleek silhouette. Perfect for business meetings, weddings, or any occasion requiring sophisticated style.',
      coverImage: 'blog/img.png',
      images: [
        'assets/img/fashion/trousers/02-detail-1.jpg',
        'assets/img/fashion/trousers/02-detail-2.jpg'
      ],
      sizes: ['30', '32', '34', '36', '38'],
      tags: ['formal', 'premium', 'tailored', 'wool', 'business']
    },
    {
      id: 8,
      title: 'Limited Edition Artist Collaboration Graphic Hoodie',
      category: 'hoods',
      price: '$72.50',
      description: 'Created in collaboration with renowned street artist Kaelen James, this limited edition hoodie features exclusive screen-printed artwork that\'s cured at high temperatures for exceptional durability. Printed on premium 380gsm ring-spun cotton, the design won\'t crack or fade with washing. Each hoodie is numbered and comes with a certificate of authenticity. The relaxed fit, double-layer hood, and reinforced side seams ensure both style and longevity. Only 500 pieces produced worldwide, making this a true collector\'s item.',
      coverImage: 'blog/hood.webp',
      images: [
        'assets/img/fashion/hoods/02-detail-1.jpg',
        'assets/img/fashion/hoods/02-detail-2.jpg'
      ],
      sizes: ['M', 'L', 'XL'],
      tags: ['limited', 'graphic', 'streetwear', 'artist', 'collector']
    },
    {
      id: 9,
      title: 'Technical Bucket Hat with UPF 50+ Sun Protection',
      category: 'caps',
      price: '$28.50',
      description: 'Engineered for outdoor adventures and sunny days, this technical bucket hat offers serious sun protection without compromising on style. Made from lightweight nylon with a UPF 50+ rating that blocks 98% of UVA/UVB rays. The moisture-wicking sweatband keeps you comfortable, while the adjustable chin strap ensures it stays secure in windy conditions. Features include hidden ventilation eyelets, a packable design that folds neatly into pockets, and water-repellent treatment that beads away light rain. Available in multiple seasonal colors inspired by natural landscapes.',
      coverImage: 'blog/img_4.png',
      images: [
        'assets/img/fashion/caps/02-detail-1.jpg',
        'assets/img/fashion/caps/02-detail-2.jpg'
      ],
      sizes: ['One Size'],
      tags: ['summer', 'beach', 'accessory', 'technical', 'outdoor']
    },
    {
      id: 10,
      title: 'Utility Cargo Jogger Pants with Multiple Pockets',
      category: 'trousers',
      price: '$68.00',
      oldPrice: '$90.00',
      sale: true,
      description: 'Blending athletic comfort with utilitarian style, these cargo joggers feature an innovative fabric that combines cotton, polyester, and elastane for four-way stretch and recovery. The articulated knee construction allows for maximum mobility, while the elastic waistband with adjustable drawcord provides a custom fit. Functional details include six pockets: two regular hand pockets, two cargo pockets with Velcro closures, and two hidden zippered security pockets. The tapered leg with ribbed ankle cuffs creates a modern silhouette that works with sneakers or boots.',
      coverImage: 'blog/img_1.png',
      images: [
        'assets/img/fashion/trousers/03-detail-1.jpg',
        'assets/img/fashion/trousers/03-detail-2.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      tags: ['streetwear', 'cargo', 'utility', 'athleisure', 'practical']
    },
    {
      id: 11,
      title: 'Luxury Silk-Cotton Blend Dress Shirt with Mother of Pearl Buttons',
      category: 'shirts',
      price: '$135.00',
      description: 'Experience unparalleled luxury with this dress shirt crafted from an exquisite blend of 70% extra-long staple cotton and 30% mulberry silk. The fabric possesses a natural luster and fluid drape that moves with you, while the silk content provides temperature regulation for year-round comfort. Each detail has been meticulously considered: single-needle stitching throughout, reinforced gussets, split yoke for perfect shoulder fit, and genuine mother of pearl buttons that catch the light beautifully. The tailored slim fit is designed to be worn with or without a jacket, making it equally appropriate for boardrooms and special occasions.',
      coverImage: 'blog/shirt.webp',
      images: [
        'assets/img/fashion/shirts/03-detail-1.jpg',
        'assets/img/fashion/shirts/03-detail-2.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      tags: ['luxury', 'formal', 'premium', 'silk', 'business']
    },
    {
      id: 12,
      title: 'Merino Wool Blend Beanie with Leather Brand Patch',
      category: 'caps',
      price: '$24.99',
      description: 'Stay warm in style with this premium beanie crafted from a soft blend of merino wool and acrylic. Merino wool\'s natural properties include temperature regulation, moisture-wicking, and odor resistance, making it ideal for all-day wear. The ribbed knit provides excellent stretch and recovery, ensuring a comfortable fit for various head sizes. The subtle leather patch adds a touch of sophistication without overwhelming branding. The seamless construction prevents itching and discomfort, while the fold-over cuff allows for adjustable coverage. Perfect for winter sports, city commuting, or casual weekend wear.',
      coverImage: 'blog/cap.webp',
      images: [
        'assets/img/fashion/caps/03-detail-1.jpg',
        'assets/img/fashion/caps/03-detail-2.jpg'
      ],
      sizes: ['One Size'],
      tags: ['winter', 'accessory', 'unisex', 'wool', 'cold-weather']
    }
  ];
}
