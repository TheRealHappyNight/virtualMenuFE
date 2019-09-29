import {Injectable} from '@angular/core';

import { Category} from './category';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  configUrl = 'http://192.168.1.213:8080';

  constructor(private httpClient: HttpClient) { }

  getProductFromCategory(selectedCategory: number) {
    return this.httpClient.get<Product[]>(this.configUrl + '/category/' + selectedCategory);
  }

  getCategories(selectedRestaurant: string) {
    return this.httpClient.get<Category[]>(this.configUrl + '/restaurant/' +  selectedRestaurant + '/category');
  }
}
