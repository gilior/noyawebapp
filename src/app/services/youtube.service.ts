import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from './YTModel';


/**
 * Represents a single YouTube playlist item resource.
 */
export interface YouTubePlaylistItemResource {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string; // datetime
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: { // This allows for different thumbnail sizes (e.g., "default", "medium", "high")
        url: string;
        width: number; // unsigned integer
        height: number; // unsigned integer
      };
    };
    channelTitle: string;
    videoOwnerChannelTitle?: string; // Optional, as it might not always be present
    videoOwnerChannelId?: string; // Optional, as it might not always be present
    playlistId: string;
    position: number; // unsigned integer
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt?: string; // Optional
    endAt?: string; // Optional
    note?: string; // Optional
    videoPublishedAt?: string; // datetime, Optional
  };
  status: {
    privacyStatus: string;
  };
}

/**
 * Represents the full response for a list of YouTube playlist items.
 */
export interface YouTubePlaylistItemListResponse {
  kind: "youtube#playlistItemListResponse";
  etag: string;
  nextPageToken?: string; // Optional, as it might not be present if there's no next page
  prevPageToken?: string; // Optional, as it might not be present if there's no previous page
  pageInfo: {
    totalResults: number; // integer
    resultsPerPage: number; // integer
  };
  items: YouTubePlaylistItemResource[];
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyBtkR2YOjdLKEXE6XCb42V1-hY9fUM7QFY'; // Replace with your YouTube Data API key
  private apiListsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
  private apiVideosUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) { }

  public loadVideos(playlistId: string): Observable<YouTubePlaylistItemListResponse> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('playlistId', playlistId)
      .set('maxResults', '50') // Max items per request (up to 50)
      .set('key', this.apiKey);

    return this.http.get<YouTubePlaylistItemListResponse>(this.apiListsUrl, { params });
  }

  public loadSingleVideo(videoID: string): Observable<Root> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('id', videoID)
      .set('key', this.apiKey);
    return this.http.get<Root>(this.apiVideosUrl, { params });
  }
}
