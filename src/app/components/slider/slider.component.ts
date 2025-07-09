import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent{
  images: string[] =
    [
      'assets/slider1.jpg',
      'assets/slider2.jpg',
      'assets/slider3.jpg',
    ]
  currentIndex: number = 0;
  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
    else {
      this.reset();
    }
  }
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.reset();
    }
  }
  reset(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1;
    }
    else {
      this.currentIndex = 0;
    }
  }
}
  
