import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoumouseFooter } from './anoumouse-footer';

describe('AnoumouseFooter', () => {
  let component: AnoumouseFooter;
  let fixture: ComponentFixture<AnoumouseFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnoumouseFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnoumouseFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
