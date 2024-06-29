import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { AppConstants } from 'src/app/util/app-constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url:string = AppConstants.BASE_URL;

  constructor(private http: HttpClient) {}

  postProduct(productData: any) {
    return this.http.post<any>(`${this.url}/v1/admin/Product/save`, productData);
  }

  getProduct() {
    return this.http.post<any>(`${this.url}/v1/admin/Product/list`, 
    {
      "filter": {},
      "sort": {},
      "start": 0,
      "limit": 10
  });
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/products` + id);
  }

  updateProduct(categories: any, id: number) {
    return this.http.put<Product>(
      `${this.url}/products` + id,
      categories
    );
  }
   deleteProduct(_id: string): Observable<any> {
    return this.http.post(`${this.url}/v1/admin/Product/delete`, {
      data: {
        _id
      } 
    });
  }
}
