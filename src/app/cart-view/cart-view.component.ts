import {ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {CustomCartService} from '../services/custom-cart.service';
import {AppUtilities} from '../services/AppUtilities';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit, OnChanges {
  items: BaseCartItem[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity'];

  constructor(private cartService: CartService<BaseCartItem>,
              private customCartService: CustomCartService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  ngOnChanges(changes) {
    this.items = this.cartService.getItems();
    console.log('cevaa');
  }

  displayPrice(price: any) {
    return AppUtilities.displayPrice(price);
  }

  increaseQuantity(itemId: number) {
    const item = this.cartService.getItem(itemId);
    item.setQuantity(this.cartService.getItem(itemId).quantity + 1);
    this.cartService.addItem(item);
  }

  decreaseQuantity(itemId: number) {
    const item = this.cartService.getItem(itemId);
    if (item.getQuantity() > 1) {
      item.setQuantity(this.cartService.getItem(itemId).quantity - 1);
      this.cartService.addItem(item);
    } else {
      this.cartService.removeItem(itemId);
      this.items = this.cartService.getItems();
    }
  }
}
