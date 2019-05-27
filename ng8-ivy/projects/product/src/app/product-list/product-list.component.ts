import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.loadProducts();
  }

  public addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
