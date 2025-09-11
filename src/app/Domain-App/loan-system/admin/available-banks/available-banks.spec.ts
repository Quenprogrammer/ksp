import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBanks } from './available-banks';

describe('AvailableBanks', () => {
  let component: AvailableBanks;
  let fixture: ComponentFixture<AvailableBanks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableBanks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableBanks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
