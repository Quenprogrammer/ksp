import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoymouseHeader } from './anoymouse-header';

describe('AnoymouseHeader', () => {
  let component: AnoymouseHeader;
  let fixture: ComponentFixture<AnoymouseHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnoymouseHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnoymouseHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
