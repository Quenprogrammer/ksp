import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerInbox } from './lecturer-inbox';

describe('LecturerInbox', () => {
  let component: LecturerInbox;
  let fixture: ComponentFixture<LecturerInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
