import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-image',
  standalone: true,
  imports: [],
  templateUrl: './review-image.component.html',
  styleUrl: './review-image.component.scss'
})
export class ReviewImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
}
