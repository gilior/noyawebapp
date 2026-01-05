import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor(private http: HttpClient) { }
  
  /**
   * Reads image URLs from a text file
   * @param filePath Path to the text file containing image URLs
   * @returns Observable of string array containing the image URLs
   */
  getImagesFromFile(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(text => this.parseImageUrls(text))
      );
  }
  
  /**
   * Parses the content of the text file to extract image URLs
   */
  private parseImageUrls(fileContent: string): string[] {
    // Split the file content by newlines
    const lines = fileContent.split('\n');
    
    // Filter out lines that are not URLs or are empty
    return lines
      .filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine.length > 0 && 
          !trimmedLine.startsWith('//') && 
          trimmedLine.includes('http');
      })
      .map(line => line.trim());
  }
}