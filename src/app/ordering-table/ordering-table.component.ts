import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../model/Table';

@Component({
  selector: 'app-ordering-table',
  templateUrl: './ordering-table.component.html',
  styleUrls: ['./ordering-table.component.css']
})
export class OrderingTableComponent implements OnInit {
  @Input() table: Table;

  constructor() { }

  ngOnInit() {
  }

}
