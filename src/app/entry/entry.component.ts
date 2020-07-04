import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantService} from '../services/restaurant.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.restaurantService.getRestaurantBy(this.route.snapshot.paramMap.get('uuid')).subscribe(result => {
      localStorage.setItem('restaurantName', result.name);
      console.log(result);
    });
    localStorage.setItem('restaurantUUID', this.route.snapshot.paramMap.get('uuid'));
    localStorage.setItem('tableId', this.route.snapshot.paramMap.get('id'));
  }

}
