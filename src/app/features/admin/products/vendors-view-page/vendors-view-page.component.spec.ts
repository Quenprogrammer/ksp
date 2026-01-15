import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsViewPageComponent } from './vendors-view-page.component';

describe('VendorsViewPageComponent', () => {
  let component: VendorsViewPageComponent;
  let fixture: ComponentFixture<VendorsViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
