import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPosts } from './blog-posts';

describe('BlogPosts', () => {
  let component: BlogPosts;
  let fixture: ComponentFixture<BlogPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
