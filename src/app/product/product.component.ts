import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../services/product.service';
import {ImageService} from '../services/image.service';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {ProductDTO} from '../DTO/ProductDTO';
import {AddProductComponent} from '../add-product/add-product.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isAdmin: boolean;
  selectedFile: ImageSnippet;
  @Output() productEdited: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() productDelete: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private cartService: CartService<BaseCartItem>,
              private dialog: MatDialog,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.imageService.getProductImage(this.product).subscribe(image => {
      this.product.image = image;
    });
  }

  switchState() {
    this.productService.switchState(this.product).subscribe(item => {
      this.product = item;
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadProductImage(this.selectedFile.file, this.product).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    });

    reader.readAsDataURL(file);
  }

  editProduct(product: Product): void {
    const productDto: ProductDTO = new ProductDTO();
    productDto.isEditing = true;
    productDto.product = product;
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: productDto
    });

    dialogRef.afterClosed().subscribe(editedProduct => {
        if (!editedProduct) {
          return;
        }

        this.productEdited.emit(editedProduct);
      }
    );
  }

  selectImage() {
    document.getElementById('imageInput' + this.product.id).click();
  }

  deleteProduct(product: Product) {
    this.productDelete.emit(product);
  }

  public createCartItem() {
    const item = new BaseCartItem();
    item.setId(this.product.id);
    item.setName(this.product.name);
    item.setPrice(this.product.price);
    if (this.cartService.getItem(this.product.id)) {
      item.setQuantity(this.cartService.getItem(this.product.id).quantity + 1);
    } else {
      item.setQuantity(1);
    }
    return item;
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
}
