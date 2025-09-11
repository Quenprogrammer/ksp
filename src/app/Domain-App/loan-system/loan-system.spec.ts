import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSystem } from './loan-system';

describe('LoanSystem', () => {
  let component: LoanSystem;
  let fixture: ComponentFixture<LoanSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
