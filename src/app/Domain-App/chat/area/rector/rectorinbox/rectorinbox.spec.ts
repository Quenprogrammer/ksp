import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rectorinbox } from './rectorinbox';

describe('Rectorinbox', () => {
  let component: Rectorinbox;
  let fixture: ComponentFixture<Rectorinbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rectorinbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rectorinbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
