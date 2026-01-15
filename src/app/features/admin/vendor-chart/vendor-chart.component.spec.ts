import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorChartComponent } from './vendor-chart.component';

describe('VendorChartComponent', () => {
  let component: VendorChartComponent;
  let fixture: ComponentFixture<VendorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
