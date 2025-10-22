import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateProfileComponent } from './affiliate-profile.component';

describe('AffiliateProfileComponent', () => {
  let component: AffiliateProfileComponent;
  let fixture: ComponentFixture<AffiliateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliateProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
