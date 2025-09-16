import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreDatabaswComponent } from './restore-databasw.component';

describe('RestoreDatabaswComponent', () => {
  let component: RestoreDatabaswComponent;
  let fixture: ComponentFixture<RestoreDatabaswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreDatabaswComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreDatabaswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
