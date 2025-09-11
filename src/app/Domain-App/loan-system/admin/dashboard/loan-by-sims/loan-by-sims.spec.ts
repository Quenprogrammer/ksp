import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBySims } from './loan-by-sims';

describe('LoanBySims', () => {
  let component: LoanBySims;
  let fixture: ComponentFixture<LoanBySims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanBySims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanBySims);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
