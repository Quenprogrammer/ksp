import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGender } from './chat-gender';

describe('ChatGender', () => {
  let component: ChatGender;
  let fixture: ComponentFixture<ChatGender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatGender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatGender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
