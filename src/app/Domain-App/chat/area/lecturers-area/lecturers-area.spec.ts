import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturersArea } from './lecturers-area';

describe('LecturersArea', () => {
  let component: LecturersArea;
  let fixture: ComponentFixture<LecturersArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturersArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturersArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
