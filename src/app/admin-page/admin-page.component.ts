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
  addFlag = false;
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

  changeAddFlag(b: boolean) {
    this.addFlag = b;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.products.push(result);
    });
  }

  editProduct(product: Product): void {
    const productDto: ProductDTO = new ProductDTO();
    productDto.isEditing = true;
    console.log('eva in edit cat ' + product.category);
    productDto.product = product;
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: productDto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.products.push(result);
    });
  }
}
