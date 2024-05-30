import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  postProduct(categories: any) {
    return this.http.post<any>(' http://localhost:3000/products', categories);
  }

  getProduct() {
    return this.http.get<any>(' http://localhost:3000/products');
  }

  getProductById(id: number) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  updateProduct(categories: any, id: number) {
    return this.http.put<Product>(
      ' http://localhost:3000/products/' + id,
      categories
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
