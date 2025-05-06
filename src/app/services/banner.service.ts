import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/util/app-constant';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = `${AppConstants.BASE_URL}/v1/banner/upload-banner`;
  private fetchUrl = `${AppConstants.BASE_URL}/v1/banner/banners`; // POST endpoint to fetch banners
  private deleteUrl = `${AppConstants.BASE_URL}/v1/banner/banner`; // DELETE endpoint

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  private getToken(): string | null {
    return localStorage.getItem('token'); // Assuming token is stored in localStorage
  }
  // Upload banner image
  uploadBanner(file: File): Observable<any> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const formData = new FormData();
    formData.append('image', file, file.name); // Append the file to the form data

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }
  // Fetch banners via POST
  getBanners(): Observable<any[]> {
    const body = {}; // Modify if you want to send filters
    return this.http.post<any[]>(this.fetchUrl, body, {
      headers: this.getHeaders(),
    });
  }

  // Delete banner
  deleteBanner(id: string): Observable<any> {
    return this.http.post<any>(`${this.deleteUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
