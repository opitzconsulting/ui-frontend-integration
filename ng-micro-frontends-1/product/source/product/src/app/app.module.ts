import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { ProductRootComponent } from "./product-root/product-root.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ProductRootComponent, ProductListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  entryComponents: [ProductRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    customElements.define(
      "product-element",
      createCustomElement(ProductRootComponent, { injector })
    );
  }
  ngDoBootstrap() {}
}
