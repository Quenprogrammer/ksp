import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRecords } from './transactions-records';

describe('TransactionsRecords', () => {
  let component: TransactionsRecords;
  let fixture: ComponentFixture<TransactionsRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsRecords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsRecords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
