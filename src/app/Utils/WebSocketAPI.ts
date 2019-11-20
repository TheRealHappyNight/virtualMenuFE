import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {AdminOrder} from '../model/AdminOrder';
import {OrderListingComponent} from '../order-listing/order-listing.component';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/orders';
  stompClient: any;
  orderListingComponent: OrderListingComponent;

  constructor(orderListingComponent: OrderListingComponent) {
    this.orderListingComponent = orderListingComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    return _this.stompClient.connect({}, frame => {
      _this.stompClient.subscribe(_this.topic, sdkEvent => {
        _this.onMessageReceived(sdkEvent.body);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   */
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/subscribe', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    const obj = JSON.parse(message);
    const order = obj as AdminOrder;
    this.orderListingComponent.handleOrder(order);
  }
}
