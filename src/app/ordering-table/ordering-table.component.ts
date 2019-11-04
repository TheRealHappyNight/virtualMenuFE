import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../model/Table';

@Component({
  selector: 'app-ordering-table',
  templateUrl: './ordering-table.component.html',
  styleUrls: ['./ordering-table.component.css']
})
export class OrderingTableComponent implements OnInit {
  @Input() table: Table;
  tableURL: string;

  constructor() { }

  ngOnInit() {
    this.getURL();
  }

  getURL() {
    this.tableURL = 'http://' + window.location.host + '/restaurant/' + this.table.restaurant.uuid + '/' + this.table.id;
  }
}
