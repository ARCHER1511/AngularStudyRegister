import { Component } from '@angular/core';
import { ProductItemsComponent } from "../../components/product-items/product-items.component";

@Component({
  selector: 'app-products',
  imports: [ProductItemsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
