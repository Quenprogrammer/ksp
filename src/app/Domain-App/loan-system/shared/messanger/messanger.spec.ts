import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messanger } from './messanger';

describe('Messanger', () => {
  let component: Messanger;
  let fixture: ComponentFixture<Messanger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messanger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Messanger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
