import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Table} from '../model/Table';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) {
  }

  getTables(restaurantUUID: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(environment.backendUrl + '/restaurant/' + restaurantUUID + '/table');
  }

  addTable(table: Table) {
    return this.httpClient.post<Table>(environment.backendUrl + '/table', table);
  }

  editTable(table: Table) {
    return this.httpClient.put<Table>(environment.backendUrl + '/table', table);
  }

  deleteTable(table: Table) {
    return this.httpClient.delete(environment.backendUrl + '/table/' + table.id);
  }
}
