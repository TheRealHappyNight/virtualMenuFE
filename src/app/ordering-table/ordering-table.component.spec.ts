import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingTableComponent } from './ordering-table.component';

describe('OrderingTableComponent', () => {
  let component: OrderingTableComponent;
  let fixture: ComponentFixture<OrderingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
