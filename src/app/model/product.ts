import {Category} from './category';

export class Product {
  id: number;
  name: string;
  active: boolean;
  description: string;
  price: number;
  category?: Category;

  constructor(id: number, name: string, active: boolean, description: string, price: number, category: Category) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
