import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentClearance } from './admin-student-clearance';

describe('AdminStudentClearance', () => {
  let component: AdminStudentClearance;
  let fixture: ComponentFixture<AdminStudentClearance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentClearance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentClearance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
