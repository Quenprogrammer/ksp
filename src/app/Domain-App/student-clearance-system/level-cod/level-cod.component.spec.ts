import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCodComponent } from './level-cod.component';

describe('LevelCodComponent', () => {
  let component: LevelCodComponent;
  let fixture: ComponentFixture<LevelCodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelCodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
