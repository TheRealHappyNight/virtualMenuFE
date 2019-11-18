import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../model/category';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryService} from '../services/category.service';
import {environment} from '../../environments/environment';
import {CategoryDTO} from '../DTO/CategoryDTO';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addCategoryFormGroup: FormGroup;
  categories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CategoryDTO,
              private fb: FormBuilder,
              private injector: Injector,
              private categoryService: CategoryService) {
  }

  get name() {
    return this.addCategoryFormGroup.get('name');
  }

  get description() {
    return this.addCategoryFormGroup.get('description');
  }

  ngOnInit() {
    this.categoryService.getCategories(environment.testRestaurant).subscribe(categories => {
      this.categories = categories;
    });

    if (this.data.isEditing) {
      this.addCategoryFormGroup = this.fb.group({
        name: new FormControl(this.data.category.name, [Validators.required]),
        description: new FormControl(this.data.category.description, [Validators.required]),
      });
    } else {
      this.addCategoryFormGroup = this.fb.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });
    }
  }

  addCategory() {
    const formCategory = {
      description: this.addCategoryFormGroup.get('description').value,
      name: this.addCategoryFormGroup.get('name').value
    };

    if (formCategory.description === '' || formCategory.name === '') {
      const notificationService = this.injector.get(NotificationService);
      notificationService.notify('Fields not filled!');
      return;
    }

    if (this.isDataValid()) {
      const category = new Category(null, localStorage.getItem('restaurantUUID'), formCategory.name, formCategory.description);
      this.categoryService.addCategory(category).subscribe(item => {
        this.dialogRef.close(item);
      });
    }
  }

  editCategory() {
    const formCategory = {
      description: this.addCategoryFormGroup.get('description').value,
      name: this.addCategoryFormGroup.get('name').value
    };

    if (formCategory.name === '') {
      formCategory.name = this.data.category.name;
    }

    if (formCategory.description === '') {
      formCategory.description = this.data.category.description;
    }

    if (this.isDataValid()) {
      const category = new Category(this.data.category.id,
        localStorage.getItem('restaurantUUID'),
        formCategory.name,
        formCategory.description);
      this.categoryService.editCategory(category).subscribe(item => {
        this.dialogRef.close(item);
      });
    }
  }

  checkByName($event, name) {
    return $event.name === name;
  }

  private isDataValid() {
    const notificationService = this.injector.get(NotificationService);

    // Check if the name already exists
    // eroare nu merge
    if (!this.data.isEditing) {
      if (this.categories.findIndex(item => this.checkByName(this.data.category, item.name))) {
        notificationService.notify('This category already exists! Choose a different name.');
        return false;
      }
    }

    return true;
  }
}

