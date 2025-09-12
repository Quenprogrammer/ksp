import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSettings } from './loan-settings';

describe('LoanSettings', () => {
  let component: LoanSettings;
  let fixture: ComponentFixture<LoanSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
