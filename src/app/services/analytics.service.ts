import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = 'https://www.shop.overay.in/v1/orders/analytics/summary'; // <-- change if needed

  constructor(private http: HttpClient) {}

  // Function to get the token (you can adjust this based on where you store the token)
  private getToken(): string | null {
    return localStorage.getItem('token'); // Assuming token is stored in localStorage
  }

  // This method will include the token in the headers
  getOrderAnalytics(): Observable<any> {
    const token = this.getToken();
    
    // Prepare headers with token if available
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Send the GET request with the token in the headers
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
