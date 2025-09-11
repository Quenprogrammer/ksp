import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClearanceSystem } from './student-clearance-system';

describe('StudentClearanceSystem', () => {
  let component: StudentClearanceSystem;
  let fixture: ComponentFixture<StudentClearanceSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentClearanceSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClearanceSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
