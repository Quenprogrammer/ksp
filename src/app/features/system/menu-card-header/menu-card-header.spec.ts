import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardHeader } from './menu-card-header';

describe('MenuCardHeader', () => {
  let component: MenuCardHeader;
  let fixture: ComponentFixture<MenuCardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCardHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
