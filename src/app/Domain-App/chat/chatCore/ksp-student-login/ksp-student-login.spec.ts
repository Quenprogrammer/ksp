import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KspStudentLogin } from './ksp-student-login';

describe('KspStudentLogin', () => {
  let component: KspStudentLogin;
  let fixture: ComponentFixture<KspStudentLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KspStudentLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KspStudentLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
