export class OrderDTO {
  orderedItems: OrderedItem[] = [];
  tableId: number;
  restaurantUUID: string;
}

export class OrderedItem {
  productId: number;
  quantity: number;


  constructor(productId: number, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
