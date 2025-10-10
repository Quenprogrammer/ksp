import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHomeHero } from './loan-home-hero';

describe('LoanHomeHero', () => {
  let component: LoanHomeHero;
  let fixture: ComponentFixture<LoanHomeHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanHomeHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanHomeHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
