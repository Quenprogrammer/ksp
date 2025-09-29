import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainStatistics } from './complain-statistics';

describe('ComplainStatistics', () => {
  let component: ComplainStatistics;
  let fixture: ComponentFixture<ComplainStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplainStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainStatistics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
