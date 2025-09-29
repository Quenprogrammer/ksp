import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesLogs } from './messages-logs';

describe('MessagesLogs', () => {
  let component: MessagesLogs;
  let fixture: ComponentFixture<MessagesLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
