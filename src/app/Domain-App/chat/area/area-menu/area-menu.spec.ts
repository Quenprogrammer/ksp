import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMenu } from './area-menu';

describe('AreaMenu', () => {
  let component: AreaMenu;
  let fixture: ComponentFixture<AreaMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
