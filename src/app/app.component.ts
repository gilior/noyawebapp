import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'noyaWebApp';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(window.location.href);
        window.dataLayer.push({
          event: 'page_loaded',
          page_name: window.location.href,
        });
      });
  }
}
