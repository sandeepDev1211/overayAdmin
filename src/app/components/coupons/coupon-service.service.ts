import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from './models/coupons.model';
import { AppConstants } from 'src/app/util/app-constant';

@Injectable({
  providedIn: 'root'
})
export class CouponServiceService {
  private url:string = AppConstants.BASE_URL;

  constructor(private http: HttpClient) {}

  postcoupon(coupons: any) {
    return this.http.post<any>(`${this.url}/v1/admin/Coupon/save`, 
    {
      data:coupons
    });
  }

  getcoupon() {
    return this.http.post<any>(`${this.url}/v1/admin/Coupon/List`, {
      data :{
        
      }
    });
  }

  getcouponById(id:string) {
    return this.http.get<Coupon>(`${this.url}/v1/admin/Coupon/${id}`);
  }

  updatecoupon(couponData: any) {
    return this.http.post<Coupon>(
      `${this.url}/v1/admin/Coupon/save`,
      {
        data: couponData
      }
      
    );
  }

  deletecoupon(_id:string): Observable<any> {
    return this.http.post(`${this.url}/v1/admin/Coupon/delete`, {
      data:{
        _id
      }
    });
  }


}
