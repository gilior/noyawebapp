import { Component } from '@angular/core';

@Component({
  selector: 'noya-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: string = new Date().getFullYear().toString()

}
