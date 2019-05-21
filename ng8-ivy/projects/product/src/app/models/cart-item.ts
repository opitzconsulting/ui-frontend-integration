import { Product } from "./product";

export interface CartItem extends Product {
  count: number;
}
