import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChat } from './login-chat';

describe('LoginChat', () => {
  let component: LoginChat;
  let fixture: ComponentFixture<LoginChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
