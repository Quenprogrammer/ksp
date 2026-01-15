import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnePolicy } from './returne-policy';

describe('ReturnePolicy', () => {
  let component: ReturnePolicy;
  let fixture: ComponentFixture<ReturnePolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnePolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnePolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
