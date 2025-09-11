import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPoly } from './header-poly';

describe('HeaderPoly', () => {
  let component: HeaderPoly;
  let fixture: ComponentFixture<HeaderPoly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPoly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPoly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
