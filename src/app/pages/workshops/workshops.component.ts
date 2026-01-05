import { Component } from '@angular/core';
import { ConcertsIntroComponent } from '../../components/concerts-intro/concerts-intro.component';
import { ConcertCardComponent } from '../../components/concert-card/concert-card.component';

@Component({
  selector: 'noya-workshops',
  standalone: true,
  imports: [ConcertsIntroComponent, ConcertCardComponent],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.scss'
})
export class WorkshopsComponent {

}
