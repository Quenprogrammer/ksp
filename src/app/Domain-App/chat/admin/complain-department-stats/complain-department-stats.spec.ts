import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainDepartmentStats } from './complain-department-stats';

describe('ComplainDepartmentStats', () => {
  let component: ComplainDepartmentStats;
  let fixture: ComponentFixture<ComplainDepartmentStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplainDepartmentStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainDepartmentStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
