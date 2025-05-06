import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from './models/order.model';
import { AppConstants } from 'src/app/util/app-constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public url: string = AppConstants.BASE_URL;
  constructor(private http: HttpClient) {}

  getOrders(filterParams = {}) {
    return this.http.post<any>(`${this.url}/v1/admin/order/list`, filterParams);
  }

  postOrder(orders: any) {
    return this.http.post<any>('https://www.shop.overay.in/orders', orders);
  }

  getOrderById(orderId: number) {
    return this.http.get('https://www.shop.overay.in/orders/' + orderId);
  }
}
