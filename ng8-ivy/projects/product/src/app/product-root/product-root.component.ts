import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-root',
  templateUrl: './product-root.component.html',
  styleUrls: ['./product-root.component.css']
})
export class ProductRootComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public goToCart() {
    dispatchEvent(new CustomEvent('root:show:shopping-cart', {}));
    // tslint:disable-next-line:no-console
    console.debug("sent message 'root:show:shopping-cart'");
  }
}
