import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  constructor() {}

  getAllProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }
  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  addProduct(model: string) {
    return this.http.post(environment.apiUrl + '/product', model);
  }

  updateProduct(id: string, model: string) {
    return this.http.put(environment.apiUrl + '/product/' + id, model);
  }
  
  deleteProduct(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
