import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkspAdministratorsInbox } from './sksp-administrators-inbox';

describe('SkspAdministratorsInbox', () => {
  let component: SkspAdministratorsInbox;
  let fixture: ComponentFixture<SkspAdministratorsInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkspAdministratorsInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkspAdministratorsInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
