import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concert-card.component.html',
  styleUrls: ['./concert-card.component.scss']
})
export class ConcertCardComponent {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() isReversed: boolean = false;
}
