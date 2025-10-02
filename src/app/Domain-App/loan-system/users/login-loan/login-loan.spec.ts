import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLoan } from './login-loan';

describe('LoginLoan', () => {
  let component: LoginLoan;
  let fixture: ComponentFixture<LoginLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLoan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLoan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
