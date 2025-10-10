import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodArea } from './hod-area';

describe('HodArea', () => {
  let component: HodArea;
  let fixture: ComponentFixture<HodArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
