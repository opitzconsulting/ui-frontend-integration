import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { ProductRootComponent } from './product-root/product-root.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProductRootComponent, ProductListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ProductRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const productComponent = createCustomElement(ProductRootComponent, { injector: this.injector });
    customElements.define('product-element', productComponent);
    console.log('Custom element <product-element> available');
  }
}
