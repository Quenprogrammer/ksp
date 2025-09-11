import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanByNationalty } from './loan-by-nationalty';

describe('LoanByNationalty', () => {
  let component: LoanByNationalty;
  let fixture: ComponentFixture<LoanByNationalty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanByNationalty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanByNationalty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
