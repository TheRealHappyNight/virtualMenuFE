import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {Category} from '../model/category';
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
              private cartService: CartService<BaseCartItem>) { }

  ngOnInit() {
    // this.cartService.setLocaleFormat('4217:display:digitsInfo:ro');
    this.getProducts(this.route.snapshot.paramMap.get('id'));
  }

  getProducts(categoryId: string): void {
    this.categoryService.getProductFromCategory(+categoryId).subscribe( products => {
      this.products = products;
    });
  }

  getItemsFromCart(): BaseCartItem[] {
    return this.cartService.getItems();
  }

}
