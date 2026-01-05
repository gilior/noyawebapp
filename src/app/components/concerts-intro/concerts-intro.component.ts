import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-concerts-intro',
  standalone: true,
  imports: [],
  templateUrl: './concerts-intro.component.html',
  styleUrl: './concerts-intro.component.scss'
})
export class ConcertsIntroComponent {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
}
