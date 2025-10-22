import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAffiliateAccountComponent } from './delete-affiliate-account.component';

describe('DeleteAffiliateAccountComponent', () => {
  let component: DeleteAffiliateAccountComponent;
  let fixture: ComponentFixture<DeleteAffiliateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAffiliateAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAffiliateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
