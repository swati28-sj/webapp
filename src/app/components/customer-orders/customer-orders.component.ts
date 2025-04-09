import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/products';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);
  
  ngOnInit(){
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      console.log("orders",this.orders);
    });
  }

  sellingPrice(product: Product){
    return Math.round(product.price - (product.price * product.discount) /100);

  }

}
