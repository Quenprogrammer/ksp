import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KspStudentCreateAccount } from './ksp-student-create-account';

describe('KspStudentCreateAccount', () => {
  let component: KspStudentCreateAccount;
  let fixture: ComponentFixture<KspStudentCreateAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KspStudentCreateAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KspStudentCreateAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
