import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDocumentComponent } from './no-document.component';

describe('NoDocumentComponent', () => {
  let component: NoDocumentComponent;
  let fixture: ComponentFixture<NoDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
