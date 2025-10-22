import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLecture } from './view-lecture';

describe('ViewLecture', () => {
  let component: ViewLecture;
  let fixture: ComponentFixture<ViewLecture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLecture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLecture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
