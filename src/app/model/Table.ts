class Restaurant {
  uuid: string;
  name: string;
}

export class Table {
  id: number;
  tableNumber: number;
  reserved: boolean;
  seats: number;
  restaurant: Restaurant;
}
