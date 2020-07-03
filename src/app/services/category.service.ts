import {Injectable} from '@angular/core';

import {Category} from '../model/category';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getProductFromCategory(selectedCategory: number) {
    return this.httpClient.get<Product[]>(environment.backendUrl + '/category/' + selectedCategory);
  }

  getCategories(selectedRestaurant: string) {
    return this.httpClient.get<Category[]>(environment.backendUrl + '/restaurant/' + selectedRestaurant + '/category');
  }

  addCategory(category: Category) {
    return this.httpClient.post<Category>(environment.backendUrl + '/category', category);
  }

  editCategory(category: Category) {
    return this.httpClient.put<Category>(environment.backendUrl + '/category', category);
  }

  deleteCategory(category: Category) {
    return this.httpClient.delete(environment.backendUrl + '/category/' + category.id);
  }
}
