import {Injectable} from '@angular/core';

import { Category} from './category';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getProductFromCategory(selectedCategory: number) {
    return this.httpClient.get<Product[]>(environment.backendUrl + '/category/' + selectedCategory);
  }

  getCategories(selectedRestaurant: string) {
    return this.httpClient.get<Category[]>(environment.backendUrl + '/restaurant/' +  selectedRestaurant + '/category');
  }
}
