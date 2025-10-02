import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUserMessages } from './loan-user-messages';

describe('LoanUserMessages', () => {
  let component: LoanUserMessages;
  let fixture: ComponentFixture<LoanUserMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanUserMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanUserMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
