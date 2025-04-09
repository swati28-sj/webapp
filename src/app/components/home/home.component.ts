import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/products';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions : OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['',''],
    nav: true
  }
  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts : Product[] = [];
  bannerImages: Product[] = [];
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  ngOnInit(){
    this.customerService.getNewProducts().subscribe((data) => {
      this.newProducts = data;
      // console.log(this.newProducts);
      this.bannerImages.push(...data)
    });

    this.customerService.getFeaturedProducts().subscribe((data) => {
      this.featuredProducts = data;
      // console.log(this.featuredProducts);
      this.bannerImages.push(...data);
  });
 
  }
}
