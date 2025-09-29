import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDB } from './loan-db';

describe('LoanDB', () => {
  let component: LoanDB;
  let fixture: ComponentFixture<LoanDB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
