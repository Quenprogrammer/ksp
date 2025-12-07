import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dpartments } from './dpartments';

describe('Dpartments', () => {
  let component: Dpartments;
  let fixture: ComponentFixture<Dpartments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dpartments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dpartments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
