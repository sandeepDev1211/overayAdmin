import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  constructor(private http: HttpClient) {}

  postCategory(categories: any) {
    return this.http.post<any>('http://localhost:5000/v1/admin/Category/list', categories);
  }

  getCategory() {
    return this.http.get<any>('http://localhost:5000/v1/admin/Category/list');
  }

  getCategoryById(id: number) {
    return this.http.get<Category>('http://localhost:3000/categories/' + id);
  }

  updateCategory(categories: any, id: number) {
    return this.http.put<Category>(
      ' http://localhost:3000/categories/' + id,
      categories
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/categories/${id}`);
  }
}
