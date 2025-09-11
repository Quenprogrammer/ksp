import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDepartment } from './my-department';

describe('MyDepartment', () => {
  let component: MyDepartment;
  let fixture: ComponentFixture<MyDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
