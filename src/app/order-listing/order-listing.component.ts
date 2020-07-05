import { Component, OnInit } from '@angular/core';
import {OrderDTO} from '../DTO/OrderDTO';
import {OrderService} from '../services/order.service';
import {Order} from '../model/order';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css']
})
export class OrderListingComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getWFA_OrdersByRestaurant();
  }

  getWFA_OrdersByRestaurant(): void {
    this.orderService.getWFA_OrdersByRestaurant(localStorage.getItem('restaurantUUID')).subscribe( orders => {
      this.orders = orders;
    });
  }

}
