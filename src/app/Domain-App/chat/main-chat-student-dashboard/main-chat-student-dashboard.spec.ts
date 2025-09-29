import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatStudentDashboard } from './main-chat-student-dashboard';

describe('MainChatStudentDashboard', () => {
  let component: MainChatStudentDashboard;
  let fixture: ComponentFixture<MainChatStudentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainChatStudentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainChatStudentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
