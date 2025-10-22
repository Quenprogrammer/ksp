import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Defaults } from './defaults';

describe('Defaults', () => {
  let component: Defaults;
  let fixture: ComponentFixture<Defaults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Defaults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Defaults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
