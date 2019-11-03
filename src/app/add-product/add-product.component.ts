import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Product} from '../model/product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import {ProductService} from '../services/product.service';
import {Category} from '../model/category';
import {CategoryService} from '../services/category.service';
import {environment} from '../../environments/environment';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProductDTO} from '../DTO/ProductDTO';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  stateCtrl = new FormControl();
  addProductFormGroup: FormGroup;
  categories: Category[] = [];
  filteredCategories: Observable<Category[]>;

  selectedCategory: Category;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductDTO,
              private fb: FormBuilder,
              private injector: Injector,
              private productService: ProductService,
              private categoryService: CategoryService) {
    this.filteredCategories = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(category => category ? this._filterCategories(category) : this.categories.slice())
      );
  }

  ngOnInit(): void {
    this.selectedCategory = this.data.product.category;
    this.categoryService.getCategories(environment.testRestaurant).subscribe(categories => {
      this.categories = categories;
    });

    if (this.data.isEditing) {
      this.addProductFormGroup = this.fb.group({
        name: new FormControl(this.data.product.name, [Validators.required]),
        price: new FormControl(this.data.product.price, [Validators.required]),
        description: new FormControl(this.data.product.description, [Validators.required]),
        category: this.data.product.category,
      });
    } else {
      this.addProductFormGroup = this.fb.group({
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });
    }
  }

  get price() {
    return this.addProductFormGroup.get('price');
  }

  get name() {
    return this.addProductFormGroup.get('name');
  }

  get description() {
    return this.addProductFormGroup.get('description');
  }

  addProduct() {
    const formProduct = {
      price: this.addProductFormGroup.get('price').value,
      description: this.addProductFormGroup.get('description').value,
      name: this.addProductFormGroup.get('name').value
    };
    if (formProduct.description === '' || formProduct.name === '' || formProduct.price === '' || this.stateCtrl.value === '') {
      const notificationService = this.injector.get(NotificationService);
      notificationService.notify('Fields not filled!');
    } else {
      const product = new Product(null, formProduct.name, true, formProduct.description, formProduct.price, this.stateCtrl.value.id);
      this.productService.addProduct(product).subscribe(item => {
        this.dialogRef.close(item);
      });
    }
  }

  editProduct() {
    const formProduct = {
      price: this.addProductFormGroup.get('price').value,
      description: this.addProductFormGroup.get('description').value,
      name: this.addProductFormGroup.get('name').value
    };

    if (formProduct.name === '') {
      formProduct.name = this.data.product.name;
    }

    if (formProduct.description === '') {
      formProduct.description = this.data.product.description;
    }

    if (formProduct.price === '') {
      formProduct.price = this.data.product.price;
    }

    const product = new Product(this.data.product.id,
      formProduct.name, true,
      formProduct.description,
      formProduct.price,
      this.stateCtrl.value ? (this.stateCtrl.value.id) : null);
    this.productService.editProduct(product).subscribe(item => {
      this.dialogRef.close(item);
    });
  }

  private _filterCategories(value: any): Category[] {
    return this.categories.filter(category => category.name.toLowerCase().indexOf(value) === 0);
  }

  displayFn(category): string {
    return category ? category.name : category;
  }

  public selectCategory(category: Category) {
    this.selectedCategory = category;
  }
}
