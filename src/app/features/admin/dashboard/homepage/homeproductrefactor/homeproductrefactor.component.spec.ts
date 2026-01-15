import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeproductrefactorComponent } from './homeproductrefactor.component';

describe('HomeproductrefactorComponent', () => {
  let component: HomeproductrefactorComponent;
  let fixture: ComponentFixture<HomeproductrefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeproductrefactorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeproductrefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
