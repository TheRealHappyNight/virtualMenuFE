import {Injectable} from '@angular/core';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {HttpClient} from '@angular/common/http';
import {Order} from '../model/order';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomCartService {
  items: BaseCartItem[] = [];

  constructor(private cartService: CartService<BaseCartItem>,
              private http: HttpClient) {
    this.items = this.cartService.getItems();
  }

  public getTotalCost() {
    return this.items.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }
  addOrder(order: Order): Observable<object> {
    return this.http.post(environment.backendUrl + '/order', order);
  }
}
