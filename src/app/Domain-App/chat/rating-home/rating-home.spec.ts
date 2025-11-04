import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingHome } from './rating-home';

describe('RatingHome', () => {
  let component: RatingHome;
  let fixture: ComponentFixture<RatingHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
