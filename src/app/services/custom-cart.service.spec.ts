import { TestBed } from '@angular/core/testing';

import { CustomCartService } from './custom-cart.service';

describe('CustomCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomCartService = TestBed.get(CustomCartService);
    expect(service).toBeTruthy();
  });
});
