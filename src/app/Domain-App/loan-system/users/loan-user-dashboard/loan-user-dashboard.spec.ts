import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUserDashboard } from './loan-user-dashboard';

describe('LoanUserDashboard', () => {
  let component: LoanUserDashboard;
  let fixture: ComponentFixture<LoanUserDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanUserDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanUserDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
