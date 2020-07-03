import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    localStorage.setItem('restaurantUUID', this.route.snapshot.paramMap.get('uuid'));
    localStorage.setItem('tableId', this.route.snapshot.paramMap.get('id'));
  }

}
