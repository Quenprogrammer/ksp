import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUserNotification } from './loan-user-notification';

describe('LoanUserNotification', () => {
  let component: LoanUserNotification;
  let fixture: ComponentFixture<LoanUserNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanUserNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanUserNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
