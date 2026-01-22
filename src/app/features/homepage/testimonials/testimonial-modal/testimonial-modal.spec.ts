import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialModal } from './testimonial-modal';

describe('TestimonialModal', () => {
  let component: TestimonialModal;
  let fixture: ComponentFixture<TestimonialModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
