import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecturer } from './add-lecturer';

describe('AddLecturer', () => {
  let component: AddLecturer;
  let fixture: ComponentFixture<AddLecturer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLecturer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLecturer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
