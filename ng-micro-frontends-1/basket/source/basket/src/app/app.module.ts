import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BasketRootComponent } from "./basket-root/basket-root.component";
import { BasketListComponent } from './basket-list/basket-list.component';

@NgModule({
  declarations: [BasketRootComponent, BasketListComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [BasketRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    customElements.define(
      "basket-element",
      createCustomElement(BasketRootComponent, { injector })
    );
  }

  ngDoBootstrap() {}
}
