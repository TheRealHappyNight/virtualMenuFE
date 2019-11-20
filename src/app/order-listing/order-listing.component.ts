import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from '../Utils/WebSocketAPI';
import {AdminOrder} from '../model/AdminOrder';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css']
})
export class OrderListingComponent implements OnInit {
  webSocket: WebSocketAPI = new WebSocketAPI(this);
  orders: AdminOrder[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.webSocket._connect();
    this.orderService.getWFA_Orders().subscribe(items => {
      this.orders = items;
    });
  }

  handleOrder(order: AdminOrder) {
    this.orders.push(order);
  }
}
