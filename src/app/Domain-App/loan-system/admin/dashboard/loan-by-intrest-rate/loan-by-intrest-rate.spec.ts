import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByIntrestRate } from './loan-by-intrest-rate';

describe('LoanByIntrestRate', () => {
  let component: LoanByIntrestRate;
  let fixture: ComponentFixture<LoanByIntrestRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByIntrestRate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByIntrestRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
