import {Component, OnInit} from '@angular/core';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {CustomCartService} from '../services/custom-cart.service';
import {AppUtilities} from '../services/AppUtilities';
import {OrderDTO, OrderedItem} from '../DTO/OrderDTO';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  items: BaseCartItem[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity'];

  constructor(private cartService: CartService<BaseCartItem>,
              public customCartService: CustomCartService) {
  }


  ngOnInit() {
    this.items = this.cartService.getItems();
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

  saveOrder() {
    const order = new OrderDTO();
    order.tableId = +localStorage.getItem('tableId');
    order.restaurantUUID = localStorage.getItem('restaurantUUID');
    this.items.forEach(item => {
        order.orderedItems.push(new OrderedItem(item.id, item.quantity));
    });
    this.customCartService.addOrder(order).subscribe(response => {
      console.log(response);
    });
    // console.log(order);
  }
}
