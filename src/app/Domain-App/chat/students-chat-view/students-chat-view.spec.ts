import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsChatView } from './students-chat-view';

describe('StudentsChatView', () => {
  let component: StudentsChatView;
  let fixture: ComponentFixture<StudentsChatView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsChatView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsChatView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
