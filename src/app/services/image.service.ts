import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../model/product';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  public uploadProductImage(image: File, product: Product): Observable<object> {
    const formData = new FormData();

    formData.append('image', image);
    return this.http.post(environment.backendUrl + '/product/' + product.id + '/upload', formData);
  }

  public uploadCategoryImage(image: File, category: Category): Observable<object> {
    const formData = new FormData();

    formData.append('image', image);
    return this.http.post(environment.backendUrl + '/category/' + category.id + '/upload', formData);
  }

  public getProductImage(product: Product) {
    return this.http.get(environment.backendUrl + '/product/' + product.id + '/picture', {responseType: 'blob'})
      .map(blob => {
        if (blob.size === 0) {return null; }
        const urlCreator = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
      });
  }

  public getCategoryImage(category: Category) {
    return this.http.get(environment.backendUrl + '/category/' + category.id + '/picture', {responseType: 'blob'})
      .map(blob => {
        const urlCreator = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
      });
  }
}
