import '@angular/localize/init';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: $localize`Home | Noya Schleien` },
    { path: 'communities', loadComponent: () => import('./pages/communities/communities.component').then(m => m.CommunitiesComponent), title: $localize`Communities | Noya Schleien` },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent), title: $localize`Contact | Noya Schleien` },
    { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent), title: $localize`Gallery | Noya Schleien` },
    { path: 'videos', loadComponent: () => import('./pages/videos/videos.component').then(m => m.VideosComponent), title: $localize`Videos | Noya Schleien` },
    { path: 'bio', loadComponent: () => import('./pages/bio/bio.component').then(m => m.BioComponent), title: $localize`Bio | Noya Schleien` },
    { path: 'book', loadComponent: () => import('./pages/book/book.component').then(m => m.BookComponent), title: $localize`Book | Noya Schleien` },
    { path: 'workshops', loadComponent: () => import('./pages/workshops/workshops.component').then(m => m.WorkshopsComponent), title: $localize`Workshops | Noya Schleien` },
    { path: 'lectures', loadComponent: () => import('./pages/lectures/lectures.component').then(m => m.LecturesComponent), title: $localize`Lectures | Noya Schleien` },
    { path: 'concerts', loadComponent: () => import('./pages/concerts/concerts.component').then(m => m.ConcertsComponent), title: $localize`Concerts | Noya Schleien` },
    { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent), title: $localize`News | Noya Schleien` },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];