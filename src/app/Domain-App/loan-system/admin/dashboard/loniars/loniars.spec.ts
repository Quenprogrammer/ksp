import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loniars } from './loniars';

describe('Loniars', () => {
  let component: Loniars;
  let fixture: ComponentFixture<Loniars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loniars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loniars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
