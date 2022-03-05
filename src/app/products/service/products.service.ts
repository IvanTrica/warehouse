import { Injectable } from '@angular/core';
import { ApiService } from "../../service/api.service";
import {catchError, concatMap, forkJoin, Observable, of, throwError} from 'rxjs';
import { apiCall } from "../../../environments/environment";
import { IProduct } from "../../model/product";
import {ILocation} from "../../model/location";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private api: ApiService) { }

  getFloors() {
    return this.api.get<ILocation[]>(apiCall.getFloors).pipe(
      catchError(this.handleError)
    );
  }

  getSections() {
    return this.api.get<ILocation[]>(apiCall.getSections).pipe(
      catchError(this.handleError)
    );
  }

  getProducts() {
    return this.api.get<IProduct[]>(apiCall.getProducts).pipe(
      catchError(this.handleError)
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.api.get<IProduct>(`${apiCall.getProducts}/${id}`)
  }

  delete(id: string) {
    return this.api.delete(`${apiCall.getProducts}/${id}`);
  }

  updateProduct(product: IProduct) {
    const baseUrl = apiCall.getProducts
    return  this.api.get<IProduct[]>(`${baseUrl}?floor=${product.floor}&section=${product.section}`)
      .pipe(
        concatMap(res  => {
          const productLocation = res.find(item => item.id === product.id)
          if ((res.length === 1 && productLocation?.id === product.id) || res.length === 0) {
            // Check if location and product are same then allow for product to be updated
              return this.api.put(`${apiCall.getProducts}/${product.id}`, product)
          }
          // if location is occupied forbid product update
          return of('occupied')
        })
      )
  }

  saveProduct(product: IProduct) {
    const baseUrl = apiCall.getProducts
    let code = this.api.get<IProduct[]>(`${baseUrl}?code=${product.code}`)
    let location = this.api.get<IProduct[]>(`${baseUrl}?floor=${product.floor}&section=${product.section}`)
    return  forkJoin([code, location])
      .pipe(
        concatMap(res => {
          // if product code exist forbid product save
          if (res[0].length > 0) {
            return of('exist')
          }
          // if location is occupied forbid product save
          if (res[1].length > 0) {
            return of('occupied')
          }
          // else allow product to be saved
          return this.api.post(`${apiCall.getProducts}`, product)
        })
      )
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage =` Message: ${error.error.message}`;
    } else {
      errorMessage = `Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(error);
  }
}
