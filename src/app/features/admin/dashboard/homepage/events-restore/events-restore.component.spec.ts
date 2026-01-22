import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRestoreComponent } from './events-restore.component';

describe('EventsRestoreComponent', () => {
  let component: EventsRestoreComponent;
  let fixture: ComponentFixture<EventsRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsRestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
