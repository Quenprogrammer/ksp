import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStatus } from './employment-status';

describe('EmploymentStatus', () => {
  let component: EmploymentStatus;
  let fixture: ComponentFixture<EmploymentStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
