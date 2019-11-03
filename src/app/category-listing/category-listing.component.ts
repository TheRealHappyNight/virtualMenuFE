import {Component, OnInit} from '@angular/core';

import {Category} from '../model/category';
import {CategoryService} from '../services/category.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories(localStorage.getItem('restaurantUUID')).subscribe(categories => {
      this.categories = categories;
    });
  }
}
