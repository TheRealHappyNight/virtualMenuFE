import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Table} from '../model/Table';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  getTables(restaurantUUID: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(environment.backendUrl + '/restaurant/' + restaurantUUID + '/table');
  }
}
