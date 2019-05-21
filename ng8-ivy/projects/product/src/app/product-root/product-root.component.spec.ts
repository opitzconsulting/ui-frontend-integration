import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRootComponent } from './product-root.component';

describe('ProductRootComponent', () => {
  let component: ProductRootComponent;
  let fixture: ComponentFixture<ProductRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
