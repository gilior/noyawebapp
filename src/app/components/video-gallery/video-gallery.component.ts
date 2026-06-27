import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'noya-video-gallery',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent implements OnInit {
  @ViewChild('videoIframe') private videoIframe?: ElementRef<HTMLIFrameElement>;

  videos: YoutubeVideo[] = [];
  selectedVideo?: YoutubeVideo;
  selectedVideoUrl?: SafeResourceUrl;
  isPlaying = false;
  isMuted = false;
  loading = true;
  errorMessage = '';

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.youtubeService.loadVideos('UUO2Xi-wHrqM27neDaVrfebQ').subscribe({
      next: (response) => {
        const items = response?.items ?? [];
        this.videos = items
          .map((item: any) => this.mapVideo(item?.snippet))
          .filter((video): video is YoutubeVideo => Boolean(video));
        const firstVideo = this.videos[0];
        this.selectedVideo = firstVideo;
        this.selectedVideoUrl = firstVideo ? this.buildEmbedUrl(firstVideo.id) : undefined;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = "We couldn't load the videos right now. Please try again later.";
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  selectVideo(video: YoutubeVideo): void {
    this.selectedVideo = video;
    this.selectedVideoUrl = this.buildEmbedUrl(video.id, true);
    this.isPlaying = true;
    this.isMuted = false;
  }

  toggleMute(): void {
    const iframe = this.videoIframe?.nativeElement;
    if (!iframe?.contentWindow) return;
    const command = this.isMuted ? 'unMute' : 'mute';
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      'https://www.youtube-nocookie.com'
    );
    this.isMuted = !this.isMuted;
    this.changeDetectorRef.markForCheck();
  }

  trackByVideoId(_: number, video: YoutubeVideo): string {
    return video.id;
  }

  private mapVideo(snippet: any | undefined): YoutubeVideo | undefined {
    const videoId = snippet?.resourceId?.videoId;
    if (!videoId) {
      return undefined;
    }

    return {
      id: videoId,
      title: snippet?.title ?? 'Video title unavailable',
      description: snippet?.description ?? '',
      publishedAt: snippet?.publishedAt ?? '',
      thumbnail: snippet?.thumbnails?.maxres?.url
        ?? snippet?.thumbnails?.high?.url
        ?? snippet?.thumbnails?.medium?.url
        ?? snippet?.thumbnails?.default?.url
        ?? ''
    } satisfies YoutubeVideo;
  }

  private buildEmbedUrl(videoId: string, autoPlay = false): SafeResourceUrl {
    const params = new URLSearchParams({
        loop: '1',
      rel: '0',
      controls: '0',
      autoplay: autoPlay ? '1' : '0',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      playsinline: '1',
      enablejsapi: '1',
      origin: window.location.origin,
    });

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
    );
  }
}

interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}