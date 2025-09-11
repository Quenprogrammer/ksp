import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByState } from './loan-by-state';

describe('LoanByState', () => {
  let component: LoanByState;
  let fixture: ComponentFixture<LoanByState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
