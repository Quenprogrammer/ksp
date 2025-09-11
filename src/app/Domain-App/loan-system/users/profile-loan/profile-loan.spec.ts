import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLoan } from './profile-loan';

describe('ProfileLoan', () => {
  let component: ProfileLoan;
  let fixture: ComponentFixture<ProfileLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLoan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLoan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
