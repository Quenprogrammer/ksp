import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByGender } from './loan-by-gender';

describe('LoanByGender', () => {
  let component: LoanByGender;
  let fixture: ComponentFixture<LoanByGender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByGender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByGender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
