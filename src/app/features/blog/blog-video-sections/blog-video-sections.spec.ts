import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogVideoSections } from './blog-video-sections';

describe('BlogVideoSections', () => {
  let component: BlogVideoSections;
  let fixture: ComponentFixture<BlogVideoSections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogVideoSections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogVideoSections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
