import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedExperienceComponent } from './worked-experience.component';

describe('WorkedExperienceComponent', () => {
  let component: WorkedExperienceComponent;
  let fixture: ComponentFixture<WorkedExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkedExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkedExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
