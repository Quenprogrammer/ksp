import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMenu } from './loan-menu';

describe('LoanMenu', () => {
  let component: LoanMenu;
  let fixture: ComponentFixture<LoanMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
