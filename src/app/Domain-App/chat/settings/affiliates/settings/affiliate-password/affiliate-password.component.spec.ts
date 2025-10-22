import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatePasswordComponent } from './affiliate-password.component';

describe('AffiliatePasswordComponent', () => {
  let component: AffiliatePasswordComponent;
  let fixture: ComponentFixture<AffiliatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliatePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
