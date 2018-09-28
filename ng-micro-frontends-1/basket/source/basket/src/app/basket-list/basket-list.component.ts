import { Component, OnInit } from "@angular/core";
import { CartItem } from "../models/cart-item";

@Component({
  selector: "app-basket-list",
  templateUrl: "./basket-list.component.html",
  styleUrls: ["./basket-list.component.css"]
})
export class BasketListComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadItems();
  }

  public items: CartItem[] = [];

  public loadItems() {
    const itemsString = sessionStorage.getItem("cart");
    if (itemsString) {
      this.items = JSON.parse(itemsString);
    } else {
      this.items = [];
    }
  }

  public saveItems() {
    const itemsString = JSON.stringify(this.items);
    sessionStorage.setItem("cart", itemsString);
  }

  public calcTotal(item: CartItem) {
    return item.price * item.count;
  }

  public removeFromBasket(item: CartItem) {
    if (item.count > 1) {
      item.count--;
    } else {
      const index = this.items.map(item => item.id).indexOf(item.id);
      this.items.splice(index, 1);
    }
    this.saveItems();
  }

  public clear() {
    this.items = [];
    this.saveItems();
  }

  public goToPayment() {
    dispatchEvent(new CustomEvent("root:show:payment", {}));
  }
}
