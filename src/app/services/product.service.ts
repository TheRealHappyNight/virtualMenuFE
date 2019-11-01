import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(selectedRestaurant: string) {
    return this.httpClient.get<Product[]>(environment.backendUrl + '/restaurant/' +  selectedRestaurant + '/product');
  }

  switchState(product: Product): Observable<Product> {
    const httpParams = new HttpParams().set('active', String(!product.active));
    return this.httpClient.put<Product>(environment.backendUrl + '/product/' + product.id, null, {params: httpParams});
  }

  addProduct(product: Product) {
    return this.httpClient.post<Product>(environment.backendUrl + '/product', product);
  }
}
