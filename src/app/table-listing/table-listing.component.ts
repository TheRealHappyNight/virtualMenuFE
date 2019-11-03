import { Component, OnInit } from '@angular/core';
import {Table} from '../model/Table';
import {TableService} from '../services/table.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.css']
})
export class TableListingComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getTables(environment.testRestaurant).subscribe(tables => {
      this.tables = tables;
    });
  }

}
