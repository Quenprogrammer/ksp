import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdministrators } from './add-administrators';

describe('AddAdministrators', () => {
  let component: AddAdministrators;
  let fixture: ComponentFixture<AddAdministrators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdministrators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdministrators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
