import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {Product} from '../model/product';
import {BaseCartItem, CartService} from 'ng-shopping-cart';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private cartService: CartService<BaseCartItem>) {
  }

  ngOnInit() {
    this.getProducts(this.route.snapshot.paramMap.get('id'));
  }

  getProducts(categoryId: string): void {
    this.categoryService.getProductFromCategory(+categoryId).subscribe(products => {
      this.products = products;
    });
  }

  getItemsFromCart(): BaseCartItem[] {
    return this.cartService.getItems();
  }

}
