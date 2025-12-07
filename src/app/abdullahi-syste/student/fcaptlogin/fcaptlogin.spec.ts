import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCAPTLOGIN } from './fcaptlogin';

describe('FCAPTLOGIN', () => {
  let component: FCAPTLOGIN;
  let fixture: ComponentFixture<FCAPTLOGIN>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FCAPTLOGIN]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FCAPTLOGIN);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
