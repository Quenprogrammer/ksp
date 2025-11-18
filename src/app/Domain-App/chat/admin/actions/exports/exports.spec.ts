import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exports } from './exports';

describe('Exports', () => {
  let component: Exports;
  let fixture: ComponentFixture<Exports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
