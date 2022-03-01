import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T>  {
    return this.http.get<T>(url);
  }

  post(url: string, options?: null, params?: {}) {
    return this.http.post(url, options, params);
  }

  put(url: string, params?: {}) {
    return this.http.put(url, params);
  }

  delete(url: string) {
    return this.http.delete(url);
  }
}
