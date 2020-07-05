import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrdersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
