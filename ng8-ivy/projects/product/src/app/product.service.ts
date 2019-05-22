import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { CartItem } from './models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // , private chgRef: ChangeDetectorRef
  constructor(private http: HttpClient, private app: ApplicationRef) {}

  public products: Product[] = [];

  public loadProducts() {
    console.log('load');
    this.http.get('http://localhost:8001/api/products').subscribe((data: any) => {
      this.products = data.products;
      this.app.tick(); // triggering change detection manually
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
