import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { PaymentRootComponent } from "./payment-root/payment-root.component";
import { PaymentFormComponent } from './payment-form/payment-form.component';

@NgModule({
  declarations: [PaymentRootComponent, PaymentFormComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [PaymentRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    customElements.define(
      "payment-element",
      createCustomElement(PaymentRootComponent, { injector })
    );
  }
  ngDoBootstrap() {}
}
