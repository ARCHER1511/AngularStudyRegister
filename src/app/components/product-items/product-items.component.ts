import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../services/product.service/product.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent implements OnInit,OnDestroy {
  products: IProduct[] = [];
   private productSubscription?: Subscription;

  constructor(private productService: ProductService){}

   ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to fetch products', err)
    });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
