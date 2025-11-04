import { TestBed } from '@angular/core/testing';

import { StudentContext } from './student-context';

describe('StudentContext', () => {
  let service: StudentContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
