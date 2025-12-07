import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcapStudentSettings } from './fcap-student-settings';

describe('FcapStudentSettings', () => {
  let component: FcapStudentSettings;
  let fixture: ComponentFixture<FcapStudentSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FcapStudentSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcapStudentSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
