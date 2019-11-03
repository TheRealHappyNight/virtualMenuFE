import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../model/product';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }


  public uploadImage(image: File, product: Product): Observable<object> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(environment.backendUrl + '/product/' + product.id + '/upload', formData);
  }

  public getImage(product: Product) {
    return this.http.get(environment.backendUrl + '/product/' + product.id + '/picture', {responseType: 'blob'})
      .map(blob => {
        const urlCreator = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
      });
  }
}
