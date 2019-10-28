import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(selectedRestaurant: string) {
    return this.httpClient.get<Product[]>(environment.backendUrl + '/restaurant/' +  selectedRestaurant + '/product');
  }
}
