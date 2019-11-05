import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product';
import {TokenStorageService} from '../auth/token-storage.service';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';
import {AuthService} from '../auth/auth.service';
import {ProductDTO} from '../DTO/ProductDTO';
import {CategoryService} from '../services/category.service';
import {Category} from '../model/category';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  currentUserInfo: any;
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;
  selectedTab = 0;

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

  receiveEditedCategory($event) {

  }

  addProduct(): void {
    const product = new ProductDTO();
    product.isEditing = false;
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products.push(result);
      }
    });
  }
}
