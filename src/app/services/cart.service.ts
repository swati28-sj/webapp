import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/products';
import { environment } from '../../environments/environment';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  items : CartItem[] = [];

  constructor() { }
  init(){
    this.getCartItems().subscribe((data) => {
      this.items = data;
    });
  }

  getCartItems() {
    return this.http.get<CartItem[]>(
      environment.apiUrl + '/customer/cart'
    );
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + '/customer/cart/' + productId, {
      quantity: quantity,
    });

  }

  removeFromCart(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/cart/' + productId);

  }
}
