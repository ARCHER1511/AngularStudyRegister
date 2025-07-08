import { Component, OnInit } from '@angular/core';
import { CommonModule,NgFor } from '@angular/common';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from '../../services/product.service/product.service';


@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    });
  }
}
