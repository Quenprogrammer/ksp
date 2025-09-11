import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLecturer } from './find-lecturer';

describe('FindLecturer', () => {
  let component: FindLecturer;
  let fixture: ComponentFixture<FindLecturer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindLecturer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindLecturer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
