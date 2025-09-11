import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByBanks } from './loan-by-banks';

describe('LoanByBanks', () => {
  let component: LoanByBanks;
  let fixture: ComponentFixture<LoanByBanks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByBanks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByBanks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
