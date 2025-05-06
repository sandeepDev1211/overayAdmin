import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {

  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this._http.post('https://www.shop.overay.in/products', data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this._http.put(`https://www.shop.overay.in/products/${id}`, data);
  }

  getProductList(): Observable<any> {
    return this._http.get('https://www.shop.overay.in/products');
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`https://www.shop.overay.in/products/${id}`);
  }
}