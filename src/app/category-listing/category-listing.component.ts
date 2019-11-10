import {Component, OnInit} from '@angular/core';

import {Category} from '../model/category';
import {CategoryService} from '../services/category.service';
import {MatDialog} from '@angular/material';
import {AddCategoryComponent} from '../add-category/add-category.component';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories(localStorage.getItem('restaurantUUID')).subscribe(categories => {
      this.categories = categories;
      this.categories.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  checkById($event, id) {
    return $event.id === id;
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.categories.push(item);
      }
    });
  }

  editCategory($event: Category) {
    const index = this.categories.findIndex(i => $event.id === i.id);
    this.categories.splice(index, 1, $event);
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  deleteCategory($event: Category) {
    this.categoryService.deleteCategory($event).subscribe(item => {
      const index = this.categories.findIndex(i => this.checkById($event, i.id));
      this.categories.splice(index, 1);
      this.categories.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
