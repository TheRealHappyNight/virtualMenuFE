import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {CustomCartService} from '../services/custom-cart.service';
import {AppUtilities} from '../services/AppUtilities';
import {RestaurantService} from '../services/restaurant.service';
import {Restaurant} from '../model/Table';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  restaurant: Restaurant;

  constructor(public tokenStorage: TokenStorageService,
              private router: Router,
              private cartService: CustomCartService,
              private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurant = new Restaurant(localStorage.getItem('restaurantUUID'), localStorage.getItem('restaurantName'));
  }

  enterMenu(): void {
  }

  enterMainPage(): void {
    this.router.navigate(['/restaurant/' + localStorage.getItem('restaurantUUID') + '/' + localStorage.getItem('tableId')]);
  }

  enterShoppingCart(): void {
    this.router.navigate(['/cart']);
  }

  displayPrice() {
    return AppUtilities.displayPrice(this.cartService.getTotalCost());
  }

  logout(): void {
    this.tokenStorage.signOut();
  }
}
