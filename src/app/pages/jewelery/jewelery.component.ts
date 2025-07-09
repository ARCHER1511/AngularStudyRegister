import { Component } from '@angular/core';
import { JewelryComponent } from "../../components/jewelry/jewelry.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-jewelery',
  imports: [ProductsComponent, JewelryComponent, SliderComponent],
  templateUrl: './jewelery.component.html',
  styleUrl: './jewelery.component.scss'
})
export class JeweleryComponent {

}
