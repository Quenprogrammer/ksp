import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsChoose } from './sections-choose';

describe('SectionsChoose', () => {
  let component: SectionsChoose;
  let fixture: ComponentFixture<SectionsChoose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsChoose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsChoose);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
