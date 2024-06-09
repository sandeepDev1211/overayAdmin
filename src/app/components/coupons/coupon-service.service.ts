import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from './models/coupons.model';

@Injectable({
  providedIn: 'root'
})
export class CouponServiceService {

  constructor(private http: HttpClient) {}

  postcoupon(coupons: any) {
    return this.http.post<any>(' http://localhost:3000/coupons', coupons);
  }

  getcoupon() {
    return this.http.get<any>(' http://localhost:3000/coupons');
  }

  getcouponById(id: number) {
    return this.http.get<Coupon>('http://localhost:3000/coupons/' + id);
  }

  updatecoupon(coupons: any, id: number) {
    return this.http.put<Coupon>(
      ' http://localhost:3000/coupons/' + id,
      coupons
    );
  }

  deletecoupon(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/coupons/${id}`);
  }


}
