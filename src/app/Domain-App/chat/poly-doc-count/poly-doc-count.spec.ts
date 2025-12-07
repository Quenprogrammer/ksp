import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyDocCount } from './poly-doc-count';

describe('PolyDocCount', () => {
  let component: PolyDocCount;
  let fixture: ComponentFixture<PolyDocCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolyDocCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolyDocCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
