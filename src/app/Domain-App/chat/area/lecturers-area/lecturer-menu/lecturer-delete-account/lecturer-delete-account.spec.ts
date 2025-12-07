import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerDeleteAccount } from './lecturer-delete-account';

describe('LecturerDeleteAccount', () => {
  let component: LecturerDeleteAccount;
  let fixture: ComponentFixture<LecturerDeleteAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerDeleteAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerDeleteAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
