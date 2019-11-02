import { Injectable } from '@angular/core';
import {BaseCartItem, CartService} from 'ng-shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class CustomCartService {
  items: BaseCartItem[] = [];

  constructor(private cartService: CartService<BaseCartItem>) {
    this.items = this.cartService.getItems();
  }

  public getTotalCost() {
    return this.items.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
}
