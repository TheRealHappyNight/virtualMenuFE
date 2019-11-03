import {OnInit} from '@angular/core';
import {Product} from '../model/product';

export class ProductDTO implements OnInit {
  public product: Product;
  public isEditing: boolean;

  ngOnInit(): void {

  }

}
