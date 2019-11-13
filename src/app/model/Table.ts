export class Restaurant {
  constructor(item: string, item2: string) {
    this.uuid = item;
    this.name = item2;
  }

  uuid: string;
  name: string;
}

export class Table {
  id: number;
  tableNumber: number;
  reserved: boolean;
  seats: number;
  restaurant: Restaurant;

  constructor(id: number, tableNumber: number, seats: number, restaurant: Restaurant) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.seats = seats;
    this.restaurant = restaurant;
  }
}
