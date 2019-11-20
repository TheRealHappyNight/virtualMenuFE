import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AdminOrder} from '../model/AdminOrder';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getWFA_Orders(): Observable<AdminOrder[]> {
    return this.http.get<AdminOrder[]>(environment.backendUrl + '/order');
  }
}
