import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.title = 'Virtual menu';
  }

  enterMenu(): void {
  }

  enterMainPage(): void {
  }

  enterShoppingCart(): void {
  }

  logout(): void {
    this.tokenStorage.signOut();
  }
}
