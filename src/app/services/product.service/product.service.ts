import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Url = 'https://fakestoreapi.com/products';
  _HttpClient = inject(HttpClient)
  // constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]>
  {
    return this._HttpClient.get<IProduct[]>(this.Url);
  }
}
