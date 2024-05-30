import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {OrderDetails } from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrder() {
    return this.http.get<any>(' http://localhost:3000/orders');
  }

  postOrder(orders: any) {
    return this.http.post<any>(' http://localhost:3000/orders', orders);
  }

  getOrderById(orderId: number) {
    return this.http.get('http://localhost:3000/orders/' + orderId);
  }

}
