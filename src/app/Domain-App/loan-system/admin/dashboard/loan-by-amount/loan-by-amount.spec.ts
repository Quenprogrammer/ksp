import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByAmount } from './loan-by-amount';

describe('LoanByAmount', () => {
  let component: LoanByAmount;
  let fixture: ComponentFixture<LoanByAmount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByAmount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByAmount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
