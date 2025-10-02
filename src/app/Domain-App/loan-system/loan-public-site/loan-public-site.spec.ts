import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPublicSite } from './loan-public-site';

describe('LoanPublicSite', () => {
  let component: LoanPublicSite;
  let fixture: ComponentFixture<LoanPublicSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanPublicSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPublicSite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
