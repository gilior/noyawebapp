import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'noya-home-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {}
