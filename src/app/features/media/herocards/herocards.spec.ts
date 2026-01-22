import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Herocards } from './herocards';

describe('Herocards', () => {
  let component: Herocards;
  let fixture: ComponentFixture<Herocards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Herocards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Herocards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
