import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsView } from './departments-view';

describe('DepartmentsView', () => {
  let component: DepartmentsView;
  let fixture: ComponentFixture<DepartmentsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
