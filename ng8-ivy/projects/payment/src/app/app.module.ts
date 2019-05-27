import { NgModule, Injector } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { createCustomElement } from '@angular/elements';
import { PaymentRootComponent } from './payment-root/payment-root.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@NgModule({
  declarations: [PaymentRootComponent, PaymentFormComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [PaymentRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const rootComponent = createCustomElement(PaymentRootComponent, { injector: this.injector });
    customElements.define('payment-element', rootComponent);
    console.log('Custom element <payment-element> available');
  }
}
