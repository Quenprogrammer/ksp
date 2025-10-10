import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiModules } from './si-modules';

describe('SiModules', () => {
  let component: SiModules;
  let fixture: ComponentFixture<SiModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
