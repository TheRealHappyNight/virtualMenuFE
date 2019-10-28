import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: Product[] = [];
  addFlag = false;
  isLoading = true;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts('abc-123').subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
  }

  changeAddFlag(b: boolean) {
    this.addFlag = b;
  }
}
