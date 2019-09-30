import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import {Product} from '../product';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  products: Product[];

  selectedCategory: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  onSelectCategory(category: Category): void {
    console.log('selected category' + category.name + '\n');
    this.selectedCategory = category;
    this.getProducts();
  }

  onSelectProduct(product: Product): void {
    console.log('selected product' + product.name + '\n');
    // Route to product details page
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
