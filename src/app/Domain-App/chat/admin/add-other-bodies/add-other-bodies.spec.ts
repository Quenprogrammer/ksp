import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherBodies } from './add-other-bodies';

describe('AddOtherBodies', () => {
  let component: AddOtherBodies;
  let fixture: ComponentFixture<AddOtherBodies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOtherBodies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOtherBodies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
