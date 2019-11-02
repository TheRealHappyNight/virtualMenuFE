import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../services/product.service';
import {ImageService} from '../services/image.service';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {DomSanitizer} from '@angular/platform-browser';

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

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private cartService: CartService<BaseCartItem>,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.imageService.getImage(this.product).subscribe(image => {
      this.product.image = image;
    });
  }

  private createCartItem() {
    const item = new BaseCartItem();
    item.setId(this.product.id);
    item.setName(this.product.name);
    item.setPrice(this.product.price);
    if (this.cartService.getItem(this.product.id)) {
      item.setQuantity(this.cartService.getItem(this.product.id).quantity + 1);
    } else {
      item.setQuantity(1);
    }
    // item.setImage(this.product.image);
    // item.setImage('https://images.app.goo.gl/VraqpnF97Wvu5RYp6');
    return item;
  }

  switchState() {
    this.productService.switchState(this.product).subscribe(item => {
      this.product = item;
      console.log(item);
    });
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file, this.product).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    });

    reader.readAsDataURL(file);
  }
}
