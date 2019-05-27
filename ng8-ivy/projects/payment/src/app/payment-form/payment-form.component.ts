import { Component, OnInit } from "@angular/core";
import { CartItem } from "../models/cart-item";

@Component({
  selector: "app-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.css"]
})
export class PaymentFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadItems();
    // when re-show app, reload data from storage
    addEventListener("payment:init", () => {
      this.payed = false;
      this.loadItems();
    });
  }

  public payed = false;
  public items: CartItem[] = [];

  public loadItems() {
    const itemsString = sessionStorage.getItem("cart");
    if (itemsString) {
      this.items = JSON.parse(itemsString);
    } else {
      this.items = [];
    }
  }

  public clearItems() {
    this.items = [];
    const itemsString = JSON.stringify(this.items);
    sessionStorage.setItem("cart", itemsString);
  }

  public calcTotal() {
    return this.items.reduce(
      (total, item) => (total += item.price * item.count),
      0
    );
  }

  public doPay() {
    this.payed = true;
    this.clearItems();
  }

  public goToProduct() {
    dispatchEvent(new CustomEvent("root:show:product", {}));
  }
}
