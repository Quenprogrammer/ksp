import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBlogs } from './home-blogs';

describe('HomeBlogs', () => {
  let component: HomeBlogs;
  let fixture: ComponentFixture<HomeBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBlogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
