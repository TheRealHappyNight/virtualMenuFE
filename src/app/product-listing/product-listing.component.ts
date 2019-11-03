import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {Category} from '../model/category';
import {Product} from '../model/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getProducts(this.route.snapshot.paramMap.get('id'));
  }

  getProducts(categoryId: string): void {
    this.categoryService.getProductFromCategory(+categoryId).subscribe( products => {
      this.products = products;
    });
  }

}
