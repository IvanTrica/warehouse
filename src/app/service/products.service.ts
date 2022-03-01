import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from 'rxjs';
import { apiCall } from "../../environments/environment";
import { IProduct } from "../model/product";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api: ApiService) { }

  getPosts(): Observable<IProduct[]> {
    return this.api.get<IProduct[]>(apiCall.getProducts);
  }
}
