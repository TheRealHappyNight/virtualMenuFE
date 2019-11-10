import {SafeUrl} from '@angular/platform-browser';

export class Category {
  id: number;
  restaurantUUID: string;
  name: string;
  description: string;
  image: SafeUrl;

  constructor(id: number, restaurantUUID: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.restaurantUUID = restaurantUUID;
  }
}
