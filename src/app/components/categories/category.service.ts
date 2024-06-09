import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category.model';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {



  constructor(private http: HttpClient,private login:LoginService) {}

  postCategory(category: { name: string; description: string }) {
    
    const token = this.login.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}` // Include token if available
    });
    const payload = { data: category };
  
    return this.http.post<any>(`http://localhost:5000/v1/admin/Category/save`, payload, { headers })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            console.error('Unauthorized request:', error);
            // Handle unauthorized error (e.g., display login prompt, redirect to login page)
            return throwError(error); // Re-throw the error for further handling
          } else {
            // Handle other errors
            return throwError(error);
          }
        })
      );
  }

  // postCategory(categories: any) {

  //   return this.http.post<any>('http://localhost:5000/v1/admin/Category/save', categories);
  // }

  // postCategory(category: { name: string; description: string }): Observable<any> {
  //   return this.http.post<any>('http://localhost:5000/v1/admin/Category/save', { headers: this.getHeaders() });
  // }

  // getCategory() {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.login.getToken() || ''}` // Include token if available
  //   });
  
  //   return this.http.post<any>(`http://localhost:5000/v1/admin/Category/list`, { headers })
  //     .pipe(
  //       catchError(error => {
  //         if (error.status === 401) {
  //           console.error('Unauthorized request:', error);
  //           // Handle unauthorized error (e.g., display login prompt, redirect to login page)
  //           return throwError(error); // Re-throw the error for further handling
  //         } else {
  //           // Handle other errors
  //           return throwError(error);
  //         }
  //       })
  //     );
  // }


  getCategory() {
    return this.http.get<any>(' http://localhost:3000/categories');
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
