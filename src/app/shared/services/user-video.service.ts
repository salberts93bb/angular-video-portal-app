import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';

@Injectable({
  providedIn: 'root'
})
export class UserVideoService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getNumberOfLikes(videoId: number, contentType: string): Observable<number> {
    let url = `${this.getAccessPointUrl(contentType)}numberoflikes/${videoId}`;
    return this.http.get<number>(url);
  }

  getNumberOfDislikes(videoId: number, contentType: string): Observable<number> {
    let url = `${this.getAccessPointUrl(contentType)}numberofdislikes/${videoId}`;
    return this.http.get<number>(url);
  }

  toggleLike(videoId: number, userName: string, contentType: string) {
    let url = `${this.getAccessPointUrl(contentType)}togglelike/${userName}/${videoId}`;
    return this.http.put<any>(url, { userId: userName }, { headers: this.headers });
  }

  toggleDislike(videoId: number, userName: string, contentType: string) {
    let url = `${this.getAccessPointUrl(contentType)}toggledislike/${userName}/${videoId}`;
    return this.http.put<any>(url, { userId: userName }, { headers: this.headers });
  }

  private getAccessPointUrl(contentType: string): string {
    let suffix = contentType === ContentTypes[ContentTypes.Movie] ? 'uservideoinmovie/' : 'uservideoinseries/';
    return `${environment.apiUrl}${suffix}`;
  }
}
