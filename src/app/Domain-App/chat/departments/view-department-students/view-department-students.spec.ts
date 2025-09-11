import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartmentStudents } from './view-department-students';

describe('ViewDepartmentStudents', () => {
  let component: ViewDepartmentStudents;
  let fixture: ComponentFixture<ViewDepartmentStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDepartmentStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepartmentStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
