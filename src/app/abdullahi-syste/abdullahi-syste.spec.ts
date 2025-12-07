import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdullahiSyste } from './abdullahi-syste';

describe('AbdullahiSyste', () => {
  let component: AbdullahiSyste;
  let fixture: ComponentFixture<AbdullahiSyste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbdullahiSyste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbdullahiSyste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
