import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BasketRootComponent } from './basket-root/basket-root.component';
import { BasketListComponent } from './basket-list/basket-list.component';

@NgModule({
  declarations: [BasketRootComponent, BasketListComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [BasketRootComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const cartComponent = createCustomElement(BasketRootComponent, { injector: this.injector });
    customElements.define('shopping-cart-element', cartComponent);
    console.log('Custom element <shopping-cart-element> available');
  }
}
