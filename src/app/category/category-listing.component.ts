import { Component, OnInit } from '@angular/core';

import { Category } from '../model/category';
import {Product} from '../model/product';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories: Category[] = [];
  products: Product[];

  selectedCategory: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  onSelectCategory(category: Category): void {
    console.log('selected category ' + category.name + '\n');
    this.selectedCategory = category;
  }

  getCategories(): void {
    this.categoryService.getCategories('abc-123').subscribe(categories => {
      this.categories = categories;
    });
  }

  getProducts(): void {
    this.categoryService.getProductFromCategory(this.selectedCategory.id).subscribe( products => {
      this.products = products;
    });
  }
}
