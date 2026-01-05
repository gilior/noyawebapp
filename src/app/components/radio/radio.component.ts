import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RadioTrack {
  title: string;
  artist: string;
  details: string;
  album: string;
  audioSrc: string;
  imageSrc: string;
}

@Component({
  selector: 'noya-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() track?: RadioTrack;
}
