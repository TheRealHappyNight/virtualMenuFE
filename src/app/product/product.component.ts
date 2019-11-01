import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isAdmin: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  switchState() {
    this.productService.switchState(this.product).subscribe(item => {
      this.product = item;
      console.log(item);
    });
  }
}
