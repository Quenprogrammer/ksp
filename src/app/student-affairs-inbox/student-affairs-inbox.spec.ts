import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAffairsInbox } from './student-affairs-inbox';

describe('StudentAffairsInbox', () => {
  let component: StudentAffairsInbox;
  let fixture: ComponentFixture<StudentAffairsInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAffairsInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAffairsInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
