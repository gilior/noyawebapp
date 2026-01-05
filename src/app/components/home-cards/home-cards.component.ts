import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface HomeCardMedia {
  concerts: string;
  lectures: string;
  workshops: string;
  book: string;
}

@Component({
  selector: 'noya-home-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss'
})
export class HomeCardsComponent {
}
