import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketRootComponent } from './basket-root.component';

describe('BasketRootComponent', () => {
  let component: BasketRootComponent;
  let fixture: ComponentFixture<BasketRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
