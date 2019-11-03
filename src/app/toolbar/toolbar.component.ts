import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {CustomCartService} from '../services/custom-cart.service';
import {AppUtilities} from '../services/AppUtilities';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title: string;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private cartService: CustomCartService) { }

  ngOnInit() {
    this.title = 'Virtual menu';
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
