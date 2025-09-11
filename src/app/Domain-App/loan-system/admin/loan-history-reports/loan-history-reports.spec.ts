import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHistoryReports } from './loan-history-reports';

describe('LoanHistoryReports', () => {
  let component: LoanHistoryReports;
  let fixture: ComponentFixture<LoanHistoryReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanHistoryReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanHistoryReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
