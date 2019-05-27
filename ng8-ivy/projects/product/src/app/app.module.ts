import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

<<<<<<< HEAD
import { ProductComponent } from './product/product.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [ProductComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ProductComponent]
=======
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
>>>>>>> ivy
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
<<<<<<< HEAD
    const productComponent = createCustomElement(ProductComponent, { injector: this.injector });
    customElements.define('product-element', productComponent);
    alert('Custom element available');
=======
    const productComponent = createCustomElement(ProductRootComponent, { injector: this.injector });
    customElements.define('product-element', productComponent);
    console.log('Custom element <product-element> available');
>>>>>>> ivy
  }
}
