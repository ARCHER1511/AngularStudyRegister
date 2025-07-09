import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../services/product.service/product.service';

@Component({
  selector: 'app-feature-product',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './feature-product.component.html',
  styleUrl: './feature-product.component.scss'
})
export class FeatureProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private productSubscription?: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
