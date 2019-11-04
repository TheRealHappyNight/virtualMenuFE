import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product';
import {TokenStorageService} from '../auth/token-storage.service';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../add-product/add-product.component';
import {AuthService} from '../auth/auth.service';
import {ProductDTO} from '../DTO/ProductDTO';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  currentUserInfo: any;
  products: Product[] = [];
  isLoading = true;
  selectedTab = 0;

  constructor(private productService: ProductService,
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
    }
  }

  checkById($event, id) {
    return $event.id === id;
  }

  receiveMessage($event) {
    const index = this.products.findIndex(i => this.checkById($event, i.id));
    this.products.splice(index, 1, $event);
    this.products.sort((a, b) => a.name.localeCompare(b.name));
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
