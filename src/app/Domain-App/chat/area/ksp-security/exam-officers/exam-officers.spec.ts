import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOfficers } from './exam-officers';

describe('ExamOfficers', () => {
  let component: ExamOfficers;
  let fixture: ComponentFixture<ExamOfficers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamOfficers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamOfficers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
