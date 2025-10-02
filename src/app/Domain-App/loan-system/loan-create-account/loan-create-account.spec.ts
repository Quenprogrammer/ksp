import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCreateAccount } from './loan-create-account';

describe('LoanCreateAccount', () => {
  let component: LoanCreateAccount;
  let fixture: ComponentFixture<LoanCreateAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanCreateAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanCreateAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
