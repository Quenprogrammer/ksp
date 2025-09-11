import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalPage } from './approval-page';

describe('ApprovalPage', () => {
  let component: ApprovalPage;
  let fixture: ComponentFixture<ApprovalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
