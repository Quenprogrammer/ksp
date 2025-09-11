import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanStatistics } from './loan-statistics';

describe('LoanStatistics', () => {
  let component: LoanStatistics;
  let fixture: ComponentFixture<LoanStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanStatistics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
