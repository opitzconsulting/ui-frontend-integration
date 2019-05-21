import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { CartItem } from './models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public products: Product[] = [];

  public loadProducts() {
    this.http.get('http://localhost:8001/api/products').subscribe((data: any) => {
      this.products = data.products;
    });
  }

  public addToCart(product: Product) {
    const curCartString = sessionStorage.getItem('cart');
    let curCart: CartItem[];
    if (!curCartString) {
      curCart = [];
    } else {
      curCart = JSON.parse(curCartString);
    }
    const index: number = curCart.map(item => item.id).indexOf(product.id);
    if (index >= 0) {
      curCart[index].count++;
    } else {
      const item = {
        ...product,
        count: 1
      };
      curCart.push(item);
    }
    sessionStorage.setItem('cart', JSON.stringify(curCart));
  }
}
