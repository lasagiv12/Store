import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.interface';
import { Product } from '../models/product-interface';
import { Category } from '../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsChange = new BehaviorSubject<Product[]>([]);
  products$ = this.productsChange.asObservable();


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<BaseResponse<Product[]>>(environment.baseUrl + "/products/").pipe(
      map((res) => res.data)

    )
  }

  getProductsBySelectedCategory(selectedCategoryId: number | null | undefined): Observable<Product[]> {
    return this.http.get<BaseResponse<Product[]>>(environment.baseUrl + "/products/category/" + selectedCategoryId).pipe(
      map((res) => {
        this.setProducts(res.data);
        console.log(res)
        return res.data
      }))
  }


  setProducts(products: Product[]) {
    this.productsChange.next(products)

  }


}
