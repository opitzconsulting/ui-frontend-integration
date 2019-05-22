import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRootComponent } from './payment-root.component';

describe('PaymentRootComponent', () => {
  let component: PaymentRootComponent;
  let fixture: ComponentFixture<PaymentRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
