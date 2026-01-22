import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEvent } from './home-event';

describe('HomeEvent', () => {
  let component: HomeEvent;
  let fixture: ComponentFixture<HomeEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
