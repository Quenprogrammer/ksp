import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KspSecurity } from './ksp-security';

describe('KspSecurity', () => {
  let component: KspSecurity;
  let fixture: ComponentFixture<KspSecurity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KspSecurity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KspSecurity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
