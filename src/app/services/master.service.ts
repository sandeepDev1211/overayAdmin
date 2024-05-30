import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from '../components/modal/data';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

getData():Observable<data[]>{
  return this.http.get<data[]>("http://localhost:3000/data");
}

}
