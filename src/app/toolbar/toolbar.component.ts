import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {CustomCartService} from '../services/custom-cart.service';
import {AppUtilities} from '../services/AppUtilities';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title: string;

  constructor(private router: Router,
              private cartService: CustomCartService) { }

  ngOnInit() {
    this.title = 'Virtual menu';
  }

  enterMenu(): void {
  }

  enterMainPage(): void {
    this.router.navigate(['/']);
  }

  enterShoppingCart(): void {
    this.router.navigate(['/cart']);
  }

  displayPrice() {
    return AppUtilities.displayPrice(this.cartService.getTotalCost());
  }
}
