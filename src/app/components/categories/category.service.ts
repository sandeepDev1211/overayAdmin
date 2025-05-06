import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category.model';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { AppConstants  } from '../../util/app-constant';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private http: HttpClient,private login:LoginService) {}

  postCategory(category: { name: string; description: string }) {
    
  
    const payload = { data: category };
  
    return this.http.post<any>(`${AppConstants.BASE_URL}/v1/admin/Category/save`, payload)
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.login.getToken() || ''}` // Include token if available
    });
    return this.http.post<any>(`${AppConstants.BASE_URL}/v1/admin/Category/list`, { headers })
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

  getCategoryById(_id: number) {
    return this.http.get<Category>(`${AppConstants.BASE_URL}/categories/` + _id);
  }

  updateCategory(categories: any,) {
    console.log("categories : ", categories);
    return this.http.post<Category>(
      `${AppConstants.BASE_URL}/v1/admin/Category/save`,
       {
        data:categories
       }
    );
  }

  deleteCategory(payload:any): Observable<any> {
    return this.http.post(`${AppConstants.BASE_URL}/v1/admin/Category/delete`, payload);
  }

}
