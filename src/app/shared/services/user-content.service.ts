import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserContentService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private accessPointUrl: string = environment.apiUrl + 'usercontent/';

  constructor(private http: HttpClient) { }

  getNumberOfLikes(contentId: number): Observable<number> {
    let url = `${this.accessPointUrl}numberoflikes/${contentId}`;
    return this.http.get<number>(url);
  }

  getNumberOfDislikes(contentId: number): Observable<number> {
    let url = `${this.accessPointUrl}numberofdislikes/${contentId}`;
    return this.http.get<number>(url);
  }

  toggleLike(contentId: number, userName: string) {
    let url = `${this.accessPointUrl}togglelike/${userName}/${contentId}`;
    return this.http.put<any>(url, { userId: userName }, { headers: this.headers });
  }

  toggleDislike(contentId: number, userName: string) {
    let url = `${this.accessPointUrl}toggledislike/${userName}/${contentId}`;
    return this.http.put<any>(url, { userId: userName }, { headers: this.headers });
  }
}
