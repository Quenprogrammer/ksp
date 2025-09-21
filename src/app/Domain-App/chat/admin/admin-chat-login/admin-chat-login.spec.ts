import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatLogin } from './admin-chat-login';

describe('AdminChatLogin', () => {
  let component: AdminChatLogin;
  let fixture: ComponentFixture<AdminChatLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChatLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChatLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
