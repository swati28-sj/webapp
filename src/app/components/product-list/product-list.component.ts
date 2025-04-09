import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/products';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatSelectModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  searchTerm : string = "";
  categoryId: string = "";
  sortBy: string = "";
  sortOrder: number = -1;
  brandId: string = "";
  products: Product[] = [];
  page=1;
  pageSize=6;
  route = inject(ActivatedRoute);
  category: Category[] = [];
  brands: Brand[] = [];
  
  ngOnInit(){
    this.customerService.getCategories().subscribe((result) => {
      this.category = result;
    });
    this.customerService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.route.queryParams.subscribe((x: any)=>{
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      this.getProducts();
    })   
  }

  getProducts(){
    setTimeout(() => {
      this.customerService.getProducts(this.searchTerm, 
        this.categoryId, 
        this.sortBy, 
        this.sortOrder,
        this.brandId,
        this.page,
        this.pageSize
      )
      .subscribe((result) => {
        console.log("result",result);
        this.products = result;
        if(result.length < this.pageSize){
          this.isNext = false;
        }
      });
    },500)
  }
  

  orderChange(event: any){
    console.log("event", event);
    console.log("sortBy", this.sortBy);
    this.sortBy = 'price';
    this.sortOrder = event.value;
    this.getProducts();

  }

  isNext  = true; 
  pageChange(page: number){
    this.page = page;
    this.isNext = true;
    this.getProducts();
  }
}
