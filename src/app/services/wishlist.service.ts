import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  http = inject(HttpClient);

  wishlists: Product[] = [];

  init(){
    return this.getWishlists().subscribe((data) => {
      this.wishlists = data;
    });
  }
  getWishlists(){
    return this.http.get<Product[]>(environment.apiUrl + "/customer/wishlist");
  }
  addInWishlists(productId: string){
    return this.http.post(environment.apiUrl + "/customer/wishlist/" + productId, {});
  }
  removeFromWishlists(productId: string){
    return this.http.delete(environment.apiUrl + "/customer/wishlist/" + productId);
  }
}
