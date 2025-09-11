import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSim } from './add-sim';

describe('AddSim', () => {
  let component: AddSim;
  let fixture: ComponentFixture<AddSim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSim]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
