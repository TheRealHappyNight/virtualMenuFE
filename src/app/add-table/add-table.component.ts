import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Restaurant, Table} from '../model/Table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TableService} from '../services/table.service';
import {TableDTO} from '../DTO/TableDTO';
import {environment} from '../../environments/environment';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {
  addTableFormGroup: FormGroup;
  tables: Table[] = [];

  constructor(public dialogRef: MatDialogRef<AddTableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TableDTO,
              private fb: FormBuilder,
              private injector: Injector,
              private tableService: TableService) {
  }

  get tableNumber() {
    return this.addTableFormGroup.get('tableNumber');
  }

  get seats() {
    return this.addTableFormGroup.get('seats');
  }

  ngOnInit() {
    this.tableService.getTables(environment.testRestaurant).subscribe(tables => {
      this.tables = tables;
    });

    if (this.data.isEditing) {
      this.addTableFormGroup = this.fb.group({
        tableNumber: new FormControl(this.data.table.tableNumber, [Validators.required]),
        seats: new FormControl(this.data.table.seats, [Validators.required])
      });
    } else {
      this.addTableFormGroup = this.fb.group({
        tableNumber: new FormControl('', [Validators.required]),
        seats: new FormControl('', [Validators.required])
      });
    }
  }

  checkById(event: Table, id) {
    return event.tableNumber === id;
  }

  private isDataValid(tableNumber, seats) {
    const notificationService = this.injector.get(NotificationService);
    if (isNaN(parseInt(tableNumber, 10))) {
      notificationService.notify('Table number should be an integer!');
      return false;
    } else if (isNaN(parseInt(seats, 10))) {
      notificationService.notify('The number of seats should be an integer!');
      return false;
    }

    // Check if the table number exists already
    if (this.tables.find(item => this.checkById(item, tableNumber))) {
      notificationService.notify('There is already a table with that number!');
    }

    return true;
  }

  addTable() {
    const formTable = {
      tableNumber: this.addTableFormGroup.get('tableNumber').value,
      seats: this.addTableFormGroup.get('seats').value
    };

    if (formTable.tableNumber === '' || formTable.seats === '') {
      const notificationService = this.injector.get(NotificationService);
      notificationService.notify('Fields not filled!');
      return;
    }

    if (this.isDataValid(formTable.tableNumber, formTable.seats)) {
      const table = new Table(null,
        formTable.tableNumber,
        formTable.seats,
        new Restaurant(localStorage.getItem('restaurantUUID'), localStorage.getItem('restaurantName'))
      );

      this.tableService.addTable(table).subscribe(item => {
        this.dialogRef.close(item);
      },
        error => {
          const notificationService = this.injector.get(NotificationService);
          notificationService.notify('Table number not unique!');
        });
    }
  }

  editTable() {
    const formTable = {
      tableNumber: this.addTableFormGroup.get('tableNumber').value,
      seats: this.addTableFormGroup.get('seats').value
    };

    if (formTable.tableNumber === '') {
      formTable.tableNumber = this.data.table.tableNumber;
    }

    if (formTable.seats === '') {
      formTable.seats = this.data.table.seats;
    }

    if (this.isDataValid(formTable.tableNumber, formTable.seats)) {
      const table = new Table(this.data.table.id,
        formTable.tableNumber,
        formTable.seats,
        new Restaurant(localStorage.getItem('restaurantUUID'), localStorage.getItem('restaurantName'))
      );

      this.tableService.editTable(table).subscribe(item => {
        this.dialogRef.close(item);
      },
        error => {
          const notificationService = this.injector.get(NotificationService);
          notificationService.notify('Table number not unique!');
        });
    }
  }
}
