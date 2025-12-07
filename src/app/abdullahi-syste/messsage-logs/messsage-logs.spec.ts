import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesssageLogs } from './messsage-logs';

describe('MesssageLogs', () => {
  let component: MesssageLogs;
  let fixture: ComponentFixture<MesssageLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesssageLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesssageLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
