import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrderDTO} from '../DTO/OrderDTO';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  getWFA_OrdersByRestaurant(selectedRestaurant: string) {
    return this.httpClient.get<Order[]>(environment.backendUrl + '/order/' + selectedRestaurant);
  }
}
