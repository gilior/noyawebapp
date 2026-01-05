import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from './YTModel';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyBtkR2YOjdLKEXE6XCb42V1-hY9fUM7QFY'; // Replace with your YouTube Data API key
  private apiListsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
  private apiVideosUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) { }

  public loadVideos(playlistId: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('playlistId', playlistId)
      .set('maxResults', '50') // Max items per request (up to 50)
      .set('key', this.apiKey);

    return this.http.get(this.apiListsUrl, { params });
  }

  public loadSingleVideo(videoID: string): Observable<Root> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('id', videoID)
      .set('key', this.apiKey);
    return this.http.get<Root>(this.apiVideosUrl, { params });
  }
}
