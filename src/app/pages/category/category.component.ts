import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../interfaces/ICategory';
import { CategoryitemComponent } from "../../components/categoryitem/categoryitem.component";
import { CategoryList } from '../../Lists/categoryList';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryitemComponent,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
    categories: ICategory[] = CategoryList;
}
