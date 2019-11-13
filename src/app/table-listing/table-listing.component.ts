import {Component, OnInit} from '@angular/core';
import {Table} from '../model/Table';
import {TableService} from '../services/table.service';

@Component({
  selector: 'app-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.css']
})
export class TableListingComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.tableService.getTables(localStorage.getItem('restaurantUUID')).subscribe(tables => {
      this.tables = tables;
    });
  }

}
