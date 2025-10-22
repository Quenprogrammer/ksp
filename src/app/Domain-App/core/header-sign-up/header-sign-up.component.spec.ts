import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSignUpComponent } from './header-sign-up.component';

describe('HeaderSignUpComponent', () => {
  let component: HeaderSignUpComponent;
  let fixture: ComponentFixture<HeaderSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
