import {Component, inject} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {BlogPost} from '../../../../blog/blog';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  private firestore = inject(Firestore);

  // 🔹 VIEW blogs (Realtime)
  blogPosts$!: Observable<(BlogPost & { docId: string })[]>;

  // 🔹 Seed data
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Sustainable Fashion: How to Build an Eco-Friendly Wardrobe",
      shortDescription: "Discover practical tips for transitioning to sustainable fashion without compromising style.",
      content: `The fashion industry is undergoing a green revolution, and building an eco-friendly wardrobe has never been more accessible. Start by embracing the 'less is more' philosophy - invest in timeless pieces that transcend seasonal trends. Look for natural, biodegradable fabrics like organic cotton, linen, and Tencel, which have lower environmental impact than synthetic alternatives.

Second-hand shopping is both sustainable and budget-friendly. Explore thrift stores, consignment shops, and online platforms like Depop or ThredUp for unique finds. When buying new, research brands committed to ethical practices - many now offer transparency about their supply chains.

Remember, sustainable fashion isn't just about what you buy, but how you care for your clothes. Wash less frequently, use cold water, and air dry when possible to extend garment life. Consider clothing repair and alteration instead of discarding items - a simple hem or patch can give clothes new life.

Building a conscious wardrobe is a journey, not an overnight transformation. Start with small changes and gradually incorporate more sustainable practices as you learn and grow in your fashion journey.`,
      category: "Fashion",
      coverImage: "blog/aimax.webp",
      images: [
        "blog/cap.webp",
        "blog/jeans.webp",
        "blog/hood.webp"
      ],
      quote: "The most sustainable garment is the one already in your closet.",
      publishDate: new Date('2024-01-15'),
      tags: ["sustainability", "eco-friendly", "ethical fashion", "slow fashion"]
    },
    {
      id: 2,
      title: "The Resurgence of Vinyl: Why Analog Music is Making a Comeback",
      shortDescription: "Exploring the renewed love for vinyl records in our digital age and what makes them special.",
      content: `In an era of streaming and digital convenience, vinyl records are experiencing an unexpected and powerful resurgence. This analog revival isn't just nostalgia - it's a meaningful counter-movement to our digital consumption habits.

The vinyl experience engages multiple senses in ways digital music can't. The ritual of selecting a record, carefully placing the needle, and flipping sides creates intentional listening sessions. The larger album artwork becomes art you can hold, and the occasional pops and crackles add character that sterile digital files lack.

Audiophiles argue that vinyl provides warmer, richer sound quality, though this is debated. What's undeniable is that vinyl encourages deeper engagement with albums as complete artistic statements rather than disposable singles. Record Store Day has become a cultural event, and new artists now routinely release vinyl alongside digital formats.

The vinyl revival also represents a push against the ephemeral nature of streaming. Owning a physical record means having permanent access to music without subscription fees or licensing changes. As we seek more tangible experiences in our increasingly digital lives, vinyl offers a satisfying blend of nostalgia, quality, and physicality that continues to attract new generations of listeners.`,
      category: "Music",
      coverImage: "assets/img/home/electronics/hero-slider/01.png",
      images: [
        "https://example.com/images/record-player.jpg",
        "https://example.com/images/album-collection.jpg",
        "https://example.com/images/record-store.jpg"
      ],
      quote: "Music is the vinyl of the soul.",
      publishDate: new Date('2024-01-22'),
      tags: ["vinyl", "analog", "music collection", "audiophile", "record stores"]
    },
    {
      id: 3,
      title: "Monochrome Magic: Mastering the Art of Single-Color Outfits",
      shortDescription: "Learn how to create stunning, sophisticated looks using variations of a single color.",
      content: `Monochromatic dressing is one of fashion's most sophisticated yet surprisingly simple styling tricks. When done right, a single-color outfit creates a sleek, elongated silhouette and makes a powerful style statement.

The key to successful monochrome isn't matching exact shades, but rather playing with different tones, textures, and fabrics within the same color family. For example, pair a navy silk blouse with cobalt wool trousers and midnight blue suede shoes. The variation in shades and materials adds depth and interest.

Black monochrome is a classic starting point - try combining matte black denim with a shiny black leather jacket and black knit accessories. For warmer months, experiment with all-white outfits using linen, cotton, and eyelet fabrics. Even vibrant colors like red or emerald green can work beautifully when layered in different tones.

Accessories are crucial in monochrome looks. Metallic accents in silver or gold can break up the color block effectively. Consider varying your shoe color or adding a contrasting belt for visual separation. Remember to play with proportions since color won't be creating natural breaks in your outfit.

Monochromatic dressing teaches you to appreciate subtlety in fashion and can actually make getting dressed quicker and easier once you understand how to build these cohesive looks.`,
      category: "Fashion",
      coverImage: "blog/chains.webp",
      images: [
        "https://example.com/images/black-monochrome.jpg",
        "https://example.com/images/color-variations.jpg",
        "https://example.com/images/texture-play.jpg"
      ],
      publishDate: new Date('2024-01-29'),
      tags: ["monochrome", "styling tips", "color theory", "minimalist fashion"]
    },
    {
      id: 4,
      title: "Blogging Evolution: From Personal Diaries to Professional Platforms",
      shortDescription: "How blogging has transformed over two decades and what the future holds for content creators.",
      content: `The blogging landscape has undergone radical transformation since the early 2000s. What began as simple online diaries has evolved into a diverse ecosystem of professional platforms, niche communities, and multimedia experiences.

Early bloggers like those on LiveJournal and Blogger wrote primarily for personal expression and small communities. The mid-2000s saw the rise of professional blogging, with platforms like WordPress enabling sophisticated sites that could compete with traditional media. The monetization era followed, with affiliate marketing, sponsored content, and ad networks turning blogs into businesses.

Today's successful blogs are rarely just text on a page. They integrate video content, podcasts, social media, and interactive elements. Microblogging on platforms like Twitter and Instagram has changed how we think about content length and frequency. Meanwhile, newsletters have made a surprising comeback as a way to build dedicated audiences.

The future of blogging points toward greater specialization and community building. Readers increasingly seek authentic voices and expertise rather than generic content. Successful bloggers will need to master multiple formats while maintaining their unique perspective. As algorithms change and platforms rise and fall, one constant remains: people's desire for genuine connection and valuable information, which quality blogging continues to provide.`,
      category: "Blogging",
      coverImage: "items/shirt3.jpg",
      images: [
        "https://example.com/images/early-blogging.jpg",
        "https://example.com/images/modern-blog.jpg",
        "https://example.com/images/future-content.jpg"
      ],
      quote: "Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive.",
      publishDate: new Date('2024-02-05'),
      tags: ["blogging history", "content creation", "digital media", "platform evolution"]
    },
    {
      id: 5,
      title: "The Psychology Behind Fashion Trends: Why We Follow What We Follow",
      shortDescription: "Understanding the psychological and social factors that drive fashion trends and our participation in them.",
      content: `Fashion trends aren't arbitrary - they're deeply rooted in human psychology, social dynamics, and cultural movements. Understanding why we follow trends reveals fascinating insights about identity, belonging, and self-expression.

At its core, trend-following satisfies our fundamental need for social belonging. When we adopt a trend, we're signaling membership in a particular group or alignment with certain values. This explains why subcultures often have distinctive fashion codes - think punk's safety pins or hip-hop's baggy jeans in earlier decades.

Psychological concepts like 'mere exposure effect' play a role - we tend to prefer things we've seen repeatedly. As celebrities, influencers, and media showcase certain styles, they become familiar and desirable. The 'bandwagon effect' then kicks in, making us more likely to adopt what we perceive as popular.

Interestingly, trends also allow for individual expression within conformity. We might follow the wide-leg pants trend but choose unique colors, fabrics, or styling that reflects our personality. This balance between fitting in and standing out is central to fashion psychology.

Economic factors and cultural moments significantly influence trends. During uncertain times, nostalgic styles often resurface as comfort. Sustainability concerns have made thrifting and upcycling trendy. Understanding these underlying forces helps us make more conscious choices about which trends we embrace and why.`,
      category: "Fashion",
      coverImage: "items/shirt.avif",
      images: [
        "https://example.com/images/treycles.jpg",
        "https://example.com/images/social-influence.jpg",
        "https://example.com/images/identity-fashion.jpg"
      ],
      publishDate: new Date('2024-02-12'),
      tags: ["fashion psychology", "trend analysis", "social behavior", "cultural studies"]
    },
    {
      id: 6,
      title: "The Rise of Gender-Fluid Fashion: Breaking Style Boundaries",
      shortDescription: "How fashion is moving beyond traditional gender norms and embracing fluid, inclusive expression.",
      content: `Gender-fluid fashion is more than just a trend—it's a cultural movement reshaping how we think about clothing and identity. Designers and retailers are increasingly moving away from traditional 'men's' and 'women's' sections, opting instead for collections based on style, fit, and personal expression rather than gender.

At the forefront are brands like Harris Reed, Telfar, and Palomo Spain, who consistently challenge gender norms through their designs. Major retailers like Zara and H&M have launched gender-neutral collections, while luxury houses like Gucci and Louis Vuitton feature non-binary models in their campaigns.

The appeal of gender-fluid fashion lies in its liberation from restrictive norms. It allows individuals to dress according to their mood, personality, and comfort rather than societal expectations. Silhouettes are becoming more versatile—think oversized blazers, flowing trousers, and tailored pieces that work across the spectrum.

Practical tips for exploring gender-fluid fashion include focusing on fit rather than section, experimenting with traditionally 'masculine' or 'feminine' pieces, and accessorizing to personalize your look. Remember, the most important rule is wearing what makes you feel authentic and confident, regardless of labels.`,
      category: "Fashion",
      coverImage: "blog/jeans.webp",
      images: [
        "https://example.com/images/androgynous-style.jpg",
        "https://example.com/images/unisex-design.jpg",
        "https://example.com/images/runway-fluid.jpg"
      ],
      quote: "Fashion is the armor to survive the reality of everyday life.",
      publishDate: new Date('2024-02-19'),
      tags: ["gender-fluid", "inclusive fashion", "non-binary style", "fashion revolution"]
    },
    {
      id: 7,
      title: "Lo-Fi Beats: The Soundtrack of Productivity and Relaxation",
      shortDescription: "Exploring the cultural phenomenon of lo-fi hip hop and its role in modern digital life.",
      content: `The gentle crackle of vinyl, the steady, mellow beats, and the soothing melodies—lo-fi music has become the unofficial soundtrack for studying, working, and relaxing for millions worldwide. What began as an underground hip-hop subgenre has evolved into a global phenomenon, with YouTube livestreams accumulating billions of hours watched.

Lo-fi's appeal lies in its intentional imperfection. The 'low fidelity' production—complete with vinyl crackles, tape hiss, and ambient noises—creates an intimate, human feel that contrasts sharply with the polished perfection of mainstream pop. This rawness makes it feel authentic and relatable.

Psychologically, lo-fi hits a sweet spot for concentration. The repetitive, predictable beats provide just enough stimulation to prevent boredom but not so much as to distract. The lack of lyrics eliminates linguistic processing, allowing the brain to focus on tasks while enjoying a pleasant auditory backdrop.

Platforms like YouTube's 'Lo-fi Girl' (formerly ChilledCow) have turned lo-fi into a 24/7 community experience, complete with chat rooms where people worldwide share their study goals and encouragement. This combination of music and community has created a unique digital space that supports productivity while combating the isolation of modern life.

From a musical perspective, lo-fi draws from jazz, hip-hop, and chillwave, often sampling obscure records and combining them with original instrumentation. The genre continues to evolve, with artists experimenting with different cultural influences and production techniques while maintaining that signature laid-back vibe.`,
      category: "Music",
      coverImage: "music/img.png",
      images: [
        "https://example.com/images/lofi-studio.jpg",
        "https://example.com/images/study-beats.jpg",
        "https://example.com/images/vinyl-sampling.jpg"
      ],
      publishDate: new Date('2024-02-26'),
      tags: ["lo-fi", "study music", "chillhop", "productivity", "ambient music"]
    },
    {
      id: 8,
      title: "Maximizing Your Blog's SEO: Beyond Basic Keywords",
      shortDescription: "Advanced SEO strategies for bloggers looking to increase organic traffic and reader engagement.",
      content: `While basic keyword optimization is essential, today's successful bloggers need a more sophisticated SEO approach. Search engines increasingly prioritize user experience, expertise, and comprehensive content over simple keyword stuffing.

Start with topic clusters rather than single keywords. Instead of targeting 'summer dresses,' create a pillar page about 'summer fashion' with supporting articles on specific dress styles, accessories, and care tips. This demonstrates topical authority to search engines.

User experience signals have become crucial. Google's Core Web Vitals measure loading performance, interactivity, and visual stability. Optimize images, minimize JavaScript, and ensure mobile responsiveness. A fast, smooth-loading blog keeps readers engaged and ranks better.

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is now fundamental. Establish your credentials through author bios, cite reputable sources, and maintain transparency. For fashion blogs, this might mean detailing your styling background or showcasing collaborations with recognized brands.

Voice search optimization is increasingly important as more people use digital assistants. Structure content to answer questions naturally, use conversational language, and include FAQ sections. Instead of 'best winter coats,' optimize for 'what's the warmest coat for snowy weather?'

Remember that SEO is an ongoing process. Regularly update old posts with current information, monitor analytics to understand what resonates with your audience, and stay informed about algorithm updates. Quality content that genuinely helps readers will always be your strongest SEO asset.`,
      category: "Blogging",
      coverImage: "music/img_1.png",
      images: [
        "https://example.com/images/seo-analytics.jpg",
        "https://example.com/images/content-strategy.jpg",
        "https://example.com/images/ranking-graph.jpg"
      ],
      quote: "Content is king, but distribution is queen and she wears the pants.",
      publishDate: new Date('2024-03-04'),
      tags: ["SEO", "blog optimization", "content strategy", "digital marketing", "traffic growth"]
    },

    {
      id: 10,
      title: "AI in Music Creation: Tool or Threat to Artistic Expression?",
      shortDescription: "Examining how artificial intelligence is transforming music production and the ongoing debate about creativity.",
      content: `Artificial intelligence is revolutionizing music creation, from generating complete compositions to enhancing production quality. Tools like OpenAI's MuseNet, AIVA, and LANDR's mastering services are becoming increasingly sophisticated, raising important questions about creativity, authenticity, and the future of musicianship.

AI's practical applications in music are already widespread. Producers use AI for mastering tracks, generating drum patterns, creating harmonies, and even suggesting chord progressions. These tools can dramatically reduce production time and lower technical barriers, allowing more people to create music.

The controversy centers on whether AI-generated music constitutes 'real' art. Critics argue that AI lacks human emotion, cultural context, and intentionality—qualities central to artistic expression. They worry about homogenization as algorithms learn from existing music, potentially recycling patterns rather than innovating.

Proponents counter that AI is simply another tool, like synthesizers or digital audio workstations were in previous decades. They point to artists like Holly Herndon, who collaborates with AI as a creative partner, and Grimes, who encourages fans to use her voice via AI for their creations. These artists see AI as expanding rather than replacing human creativity.

The legal and ethical implications are complex. Who owns AI-generated music? How do we compensate human artists whose work trains these systems? The industry is grappling with these questions as AI becomes more integrated into the creative process.

Ultimately, AI in music may follow the pattern of previous technological disruptions: initial fear followed by integration and new artistic possibilities. The most interesting developments will likely come from artists who use AI not to replace human creativity, but to augment it in unexpected ways.`,
      category: "Music",
      coverImage: "music/img_2.png",
      images: [
        "https://example.com/images/ai-music-production.jpg",
        "https://example.com/images/neural-networks.jpg",
        "https://example.com/images/human-ai-collab.jpg"
      ],
      quote: "Technology is a useful servant but a dangerous master.",
      publishDate: new Date('2024-03-18'),
      tags: ["AI music", "music technology", "artificial intelligence", "music production", "future of music"]
    }
  ];

  ngOnInit() {
    this.loadBlogPosts();
  }

  // ✅ VIEW ALL BLOG POSTS
  loadBlogPosts() {
    const blogRef = collection(this.firestore, 'blogPosts');
    this.blogPosts$ = collectionData(blogRef, {
      idField: 'docId'
    }) as Observable<(BlogPost & { docId: string })[]>;
  }

  // ✅ ADD BLOG POSTS TO FIRESTORE
  async addBlogPosts() {
    try {
      const blogRef = collection(this.firestore, 'blogPosts');

      for (const post of this.blogPosts) {
        await addDoc(blogRef, {
          ...post,
          createdAt: new Date()
        });
      }

      console.log('Blog posts added successfully');
    } catch (error) {
      console.error('Error adding blog posts:', error);
    }
  }

  // ❌ DELETE BLOG POST
  async deleteBlogPost(docId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'blogPosts', docId));
      console.log('Deleted blog post:', docId);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }


  calculateReadTime(content: string): number {
    if (!content) return 2;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}
