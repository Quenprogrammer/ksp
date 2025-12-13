import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEvaluation } from './system-evaluation';

describe('SystemEvaluation', () => {
  let component: SystemEvaluation;
  let fixture: ComponentFixture<SystemEvaluation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemEvaluation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemEvaluation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
