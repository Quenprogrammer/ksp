import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersActivities } from './users-activities';

describe('UsersActivities', () => {
  let component: UsersActivities;
  let fixture: ComponentFixture<UsersActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersActivities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersActivities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
