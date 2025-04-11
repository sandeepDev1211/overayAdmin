import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { AppConstants } from 'src/app/util/app-constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public url: string = AppConstants.BASE_URL;

  constructor(private http: HttpClient) {}

  postProduct(productData: any) {
    return this.http.post<any>(
      `${this.url}/v1/admin/Product/save`,
      productData
    );
  }

  getProduct(filterParams: any = {}) {
    return this.http.post<any>(
      `${this.url}/v1/admin/Product/list`,
      filterParams
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/v1/admin/Product/` + id);
  }

  updateProduct(productData: any) {
    return this.http.post<any>(
      `${this.url}/v1/admin/Product/save`,
      productData
    );
  }

  uploadProductFeatureImages(images: any) {
    return this.http.post<any>(
      `${this.url}/v1/admin/ProductImage/save`,
      images
    );
  }
  deleteProduct(_id: string): Observable<any> {
    return this.http.post(`${this.url}/v1/admin/Product/delete`, {
      data: {
        _id,
      },
    });
  }
}
