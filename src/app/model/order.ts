import {Restaurant, Table} from './Table';
import {Product} from './product';

export class Order {
  orderingTable: Table;
  totalPrice: number;
  orderDate: string;
  orderToProductRelations: OrderToProductRelation[] = [];
  orderStatus: ORDER_STATUS;
  restaurant: Restaurant;
}

export class OrderToProductRelation {
  product: Product;
  quantity: number;


  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

export enum ORDER_STATUS {
  WAITING_FOR_ACCEPTANCE,
  ACCEPTED,
  PREPARING_YOUR_FOOD,
  DELIVERED,
  COMPLETED
}
