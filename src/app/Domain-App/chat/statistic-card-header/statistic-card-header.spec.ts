import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCardHeader } from './statistic-card-header';

describe('StatisticCardHeader', () => {
  let component: StatisticCardHeader;
  let fixture: ComponentFixture<StatisticCardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticCardHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticCardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
