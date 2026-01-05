import { Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BioComponent } from './pages/bio/bio.component';
import { BookComponent } from './pages/book/book.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { LecturesComponent } from './pages/lectures/lectures.component';
import { ConcertsComponent } from './pages/concerts/concerts.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { VideosComponent } from './pages/videos/videos.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'communities', component:CommunitiesComponent  },
    { path: 'contact', component: ContactComponent },
    { path: 'gallery', component:  GalleryComponent},
    { path: 'videos', component: VideosComponent },
    { path: 'bio', component:  BioComponent},
    { path: 'book', component: BookComponent },
    { path: 'workshops', component: WorkshopsComponent },
    { path: 'lectures', component: LecturesComponent },
    { path: 'concerts', component: ConcertsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //
  ];