import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {Category} from '../model/category';
import {ProductService} from '../services/product.service';
import {CategoryService} from '../services/category.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {ProductDTO} from '../DTO/ProductDTO';
import {AddProductComponent} from '../add-product/add-product.component';

@Component({
  selector: 'app-edit-admin-page',
  templateUrl: './edit-admin-page.component.html',
  styleUrls: ['./edit-admin-page.component.css']
})
export class EditAdminPageComponent implements OnInit {

  currentUserInfo: any;
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;
  selectedTab = 2;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private token: TokenStorageService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUserInfo = {
      token: this.token.getToken(),
      authorities: this.token.getAuthorities(),
      username: this.token.getUsername()
    };
    if (this.currentUserInfo.token) {
      this.productService.getAllProducts(localStorage.getItem('restaurantUUID')).subscribe(products => {
        this.products = products;
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        this.isLoading = false;
      });

      this.categoryService.getCategories(localStorage.getItem('restaurantUUID')).subscribe(categories => {
        this.categories = categories;
        this.categories.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }

  checkById($event, id) {
    return $event.id === id;
  }

  receiveEditedProduct($event) {
    const index = this.products.findIndex(i => this.checkById($event, i.id));
    this.products.splice(index, 1, $event);
    this.products.sort((a, b) => a.name.localeCompare(b.name));
  }

  addProduct(): void {
    const productDTO = new ProductDTO();
    productDTO.isEditing = false;
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: productDTO
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products.push(result);
        const index = this.products.findIndex(i => this.checkById(result, i.id));
        this.products.splice(index, 1, result);
        this.products.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  deleteProduct($event) {
    this.productService.deleteProduct($event).subscribe( item => {
      const index = this.products.findIndex(i => this.checkById($event, i.id));
      this.products.splice(index, 1);
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
