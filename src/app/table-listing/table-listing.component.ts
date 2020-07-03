import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../model/Table';
import {TableService} from '../services/table.service';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {AddTableComponent} from '../add-table/add-table.component';

@Component({
  selector: 'app-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.css']
})
export class TableListingComponent implements OnInit {
  tables: Table[] = [];
  @Input() isEditingConfig: boolean;

  constructor(private tableService: TableService,
              private dialog: MatDialog,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.tableService.getTables(localStorage.getItem('restaurantUUID')).subscribe(tables => {
      this.tables = tables;
      this.tables.sort((a, b) => a.tableNumber - b.tableNumber);
    });
  }

  checkById($event, id) {
    return $event.id === id;
  }

  addTable() {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '400px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(item => {
      if (!item) { return; }

      this.tables.push(item);
      const index = this.tables.findIndex(i => this.checkById(item, i.id));
      this.tables.splice(index, 1, item);
      this.tables.sort((a, b) => a.tableNumber - b.tableNumber);
    });
  }

  editTable($event: Table) {
    const index = this.tables.findIndex(i => $event.id === i.id);
    this.tables.splice(index, 1, $event);
    this.tables.sort((a, b) => a.tableNumber - b.tableNumber);
  }

  deleteTable($event: Table) {
    this.tableService.deleteTable($event).subscribe(item => {
      const index = this.tables.findIndex(i => this.checkById($event, i.id));
      this.tables.splice(index, 1);
      this.tables.sort((a, b) => a.tableNumber - b.tableNumber);
    });
  }
}
