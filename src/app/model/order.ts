export class Order {
  orderedItems: OrderedItem[] = [];
  tableId: number;
}

export class OrderedItem {
  productId: number;
  quantity: number;


  constructor(productId: number, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
