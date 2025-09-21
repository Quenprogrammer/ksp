import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserSettings } from './chat-user-settings';

describe('ChatUserSettings', () => {
  let component: ChatUserSettings;
  let fixture: ComponentFixture<ChatUserSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
