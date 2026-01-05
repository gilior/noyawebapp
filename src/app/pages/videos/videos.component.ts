import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../../services/youtube.service';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'noya-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  currentIndex = 0;
  loading = true;
  error = '';

  get currentVideo(): Video | null {
    return this.videos.length > 0 ? this.videos[this.currentIndex] : null;
  }

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.loading = true;
    this.youtubeService.loadVideos("UUO2Xi-wHrqM27neDaVrfebQ")
      .subscribe({
        next: (response) => {
          this.videos = response.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium.url
          }));
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load videos. Please try again later.';
          this.loading = false;
          console.error('Error loading videos:', err);
        }
      });
  }

  getCurrentVideoUrl(): SafeResourceUrl {
    if (!this.currentVideo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    const url = `https://www.youtube.com/embed/${this.currentVideo.id}?rel=0&fs=0&controls=0&showinfo=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  selectVideo(index: number): void {
    if (index >= 0 && index < this.videos.length) {
      this.currentIndex = index;
    }
  }

  nextVideo(): void {
    if (this.currentIndex < this.videos.length - 1) {
      this.currentIndex++;
    }
  }

  prevVideo(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}