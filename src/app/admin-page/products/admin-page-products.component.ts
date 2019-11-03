import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../../add-product/add-product.component';
import {AuthService} from '../../auth/auth.service';
import {ProductDTO} from '../../DTO/ProductDTO';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page-products.component.html',
  styleUrls: ['./admin-page-products.component.css']
})
export class AdminPageProductsComponent implements OnInit {
  currentUserInfo: any;
  products: Product[] = [];
  isLoading = true;

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
      this.productService.getAllProducts('abc-123').subscribe(products => {
        this.products = products;
        this.isLoading = false;
      });
    }
  }
}
