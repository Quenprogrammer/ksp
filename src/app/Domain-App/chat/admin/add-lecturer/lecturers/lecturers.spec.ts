import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lecturers } from './lecturers';

describe('Lecturers', () => {
  let component: Lecturers;
  let fixture: ComponentFixture<Lecturers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lecturers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lecturers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
