import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatInbox } from './admin-chat-inbox';

describe('AdminChatInbox', () => {
  let component: AdminChatInbox;
  let fixture: ComponentFixture<AdminChatInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChatInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChatInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
