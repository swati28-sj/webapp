import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../types/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  http = inject(HttpClient);
  addOrder(order: Order){
    return this.http.post(environment.apiUrl + '/customer/order', order);

  }
  getOrders(){
    return this.http.get<Order[]>(environment.apiUrl + '/customer/orders');
  }

  getAdminOrders(){
    return this.http.get<Order[]>(environment.apiUrl + '/orders');
  }
  updateOrderStatus(id: string, status: string){
    return this.http.post(environment.apiUrl + '/orders/' + id, 
      {status: status});
  }
}
