import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Table} from '../model/Table';
import {TableDTO} from '../DTO/tableDTO';
import {AddTableComponent} from '../add-table/add-table.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-ordering-table',
  templateUrl: './ordering-table.component.html',
  styleUrls: ['./ordering-table.component.css']
})
export class OrderingTableComponent implements OnInit {
  @Input() table: Table;
  @Input() isEditingConfiguration: boolean;
  tableURL: string;
  @Output() tableEdited: EventEmitter<Table> = new EventEmitter<Table>();
  @Output() tableDelete: EventEmitter<Table> = new EventEmitter<Table>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getURL();
  }

  getURL() {
    this.tableURL = 'http://' + window.location.host + '/restaurant/' + this.table.restaurant.uuid + '/' + this.table.id;
  }

  editTable(table: Table) {
    const tableDTO: TableDTO = new TableDTO();
    tableDTO.isEditing = true;
    tableDTO.table = table;
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '400px',
      data: tableDTO
    });

    dialogRef.afterClosed().subscribe(editedTable => {
      if (!editedTable) { return; }

      this.tableEdited.emit(editedTable);
    });
  }

  deleteTable(table: Table) {
    this.tableDelete.emit(table);
  }
}
