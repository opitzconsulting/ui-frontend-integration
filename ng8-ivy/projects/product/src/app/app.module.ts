import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { ProductComponent } from './product/product.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [ProductComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ProductComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const productComponent = createCustomElement(ProductComponent, { injector: this.injector });
    customElements.define('product-element', productComponent);
    alert('Custom element available');
  }
}
