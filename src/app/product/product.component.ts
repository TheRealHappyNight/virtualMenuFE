import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../services/product.service';
import {ImageService} from '../services/image.service';
import {SafeUrl} from '@angular/platform-browser';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
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
  image: SafeUrl;

  constructor(private productService: ProductService,
              private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImage(this.product).subscribe(image => {
      this.image = image;
    });
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
