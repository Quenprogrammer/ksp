import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerMenu } from './lecturer-menu';

describe('LecturerMenu', () => {
  let component: LecturerMenu;
  let fixture: ComponentFixture<LecturerMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
