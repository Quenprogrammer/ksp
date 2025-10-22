import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationsRecords } from './loan-applications-records';

describe('LoanApplicationsRecords', () => {
  let component: LoanApplicationsRecords;
  let fixture: ComponentFixture<LoanApplicationsRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationsRecords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationsRecords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
