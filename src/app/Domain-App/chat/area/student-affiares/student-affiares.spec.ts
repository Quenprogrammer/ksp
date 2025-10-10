import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAffiares } from './student-affiares';

describe('StudentAffiares', () => {
  let component: StudentAffiares;
  let fixture: ComponentFixture<StudentAffiares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAffiares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAffiares);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
