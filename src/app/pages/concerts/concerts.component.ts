import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConcertsIntroComponent } from '../../components/concerts-intro/concerts-intro.component';
import { ConcertCardComponent } from '../../components/concert-card/concert-card.component';
import { ConcertsPressComponent } from '../../components/concerts-press/concerts-press.component';
import { YoutubeService } from '../../services/youtube.service';
import { Root } from '../../services/YTModel';

@Component({
  selector: 'noya-concerts',
  standalone: true,
  imports: [ConcertsIntroComponent, ConcertCardComponent, ConcertsPressComponent],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.scss'
})
export class ConcertsComponent implements OnInit {
  readonly highVideoID: string = "9iyh6SF7wfY";
  highVideoObject: Root | undefined;
  
  constructor(private youTubeSerice: YoutubeService, private sanitizer: DomSanitizer) {

  }
  
  ngOnInit(): void {
    this.youTubeSerice.loadSingleVideo(this.highVideoID).subscribe({
      next: (video) => {
        // Handle the received videos
        this.highVideoObject = video
      },
      error: (error) => {
        console.error('Error loading videos:', error);
      }
    });
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

}
