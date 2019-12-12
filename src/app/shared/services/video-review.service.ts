import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';
import { VideoReview } from '../models/video-review';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoReviewService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  databaseUpdated: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getReviews(videoId: number, contentType: string): Observable<VideoReview[]> {
    let url = `${this.getAccessPointUrl(contentType)}getreviews/${videoId}`;
    return this.http.get<VideoReview[]>(url);
  }

  get(id: number, contentType: string): Observable<VideoReview> {
    let url = this.getAccessPointUrlWithId(id, contentType);
    return this.http.get<VideoReview>(url);
  }

  save(videoReview: VideoReview, contentType: string): Observable<VideoReview> {
    let url = this.getAccessPointUrl(contentType);
    return this.http.post<VideoReview>(url, videoReview, { headers: this.headers }).pipe(
      tap(() => this.notifyDatabaseUpdated())
    );
  }

  update(videoReview: VideoReview, contentType: string): Observable<void> {
    let url = this.getAccessPointUrlWithId(videoReview.id, contentType);
    return this.http.put<void>(url, videoReview, { headers: this.headers }).pipe(
      tap(() => this.notifyDatabaseUpdated())
    );
  }

  delete(id: number, contentType: string): Observable<void> {
    let url = this.getAccessPointUrlWithId(id, contentType);
    return this.http.delete<void>(url).pipe(
      tap(() => this.notifyDatabaseUpdated())
    );
  }

  private getAccessPointUrlWithId(id: number, contentType: string) {
    return this.getAccessPointUrl(contentType) + id;
  }

  private getAccessPointUrl(contentType: string): string {
    let suffix = contentType === ContentTypes[ContentTypes.Movie] ? 'videoinmoviereview/' : 'videoinseriesreview/';
    return `${environment.apiUrl}${suffix}`;
  }

  private notifyDatabaseUpdated() {
    this.databaseUpdated.next();
  }
}
