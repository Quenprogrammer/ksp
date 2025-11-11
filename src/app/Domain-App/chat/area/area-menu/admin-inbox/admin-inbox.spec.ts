import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInbox } from './admin-inbox';

describe('AdminInbox', () => {
  let component: AdminInbox;
  let fixture: ComponentFixture<AdminInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
