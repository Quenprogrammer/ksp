import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTest } from './data-test';

describe('DataTest', () => {
  let component: DataTest;
  let fixture: ComponentFixture<DataTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
