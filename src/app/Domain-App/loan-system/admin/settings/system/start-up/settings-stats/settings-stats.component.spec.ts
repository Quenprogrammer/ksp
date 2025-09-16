import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStatsComponent } from './settings-stats.component';

describe('SettingsStatsComponent', () => {
  let component: SettingsStatsComponent;
  let fixture: ComponentFixture<SettingsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
