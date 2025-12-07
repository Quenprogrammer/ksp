import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFACP } from './message-facp';

describe('MessageFACP', () => {
  let component: MessageFACP;
  let fixture: ComponentFixture<MessageFACP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageFACP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageFACP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
