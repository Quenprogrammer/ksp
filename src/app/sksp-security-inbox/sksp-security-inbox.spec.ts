import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkspSecurityInbox } from './sksp-security-inbox';

describe('SkspSecurityInbox', () => {
  let component: SkspSecurityInbox;
  let fixture: ComponentFixture<SkspSecurityInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkspSecurityInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkspSecurityInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
