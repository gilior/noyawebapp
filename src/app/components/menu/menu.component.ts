import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'noya-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})


export class MenuComponent {
  collapsed = true;

  foo() {
    throw new Error('Method not implemented.');
  }
  links = [
    { title: 'One' },
    { title: 'Two' }
  ];
  showMenu: boolean = false;
  constructor(public route: ActivatedRoute) { }

  navigateWithToggle(url: string): void {
    window.open(url, '_blank');
    this.collapsed = true;
  }


}
