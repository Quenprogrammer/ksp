import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreCount } from './firestore-count';

describe('FirestoreCount', () => {
  let component: FirestoreCount;
  let fixture: ComponentFixture<FirestoreCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirestoreCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirestoreCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
