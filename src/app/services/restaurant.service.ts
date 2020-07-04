import { Injectable } from '@angular/core';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from '../model/Table';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurantBy(uuid: string) {
    return this.httpClient.get<Restaurant>(environment.backendUrl + '/restaurant/' + uuid);
  }
}
