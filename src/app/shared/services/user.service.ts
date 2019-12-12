import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private accessPointUrl: string = environment.apiUrl + 'user/';
  databaseUpdated: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.accessPointUrl);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(this.appendIdToUrl(id));
  }

  searchByUsernameOrEmail(searchTerm: string): Observable<User[]> {
    let url = `${this.accessPointUrl}search/${searchTerm}`;
    return this.http.get<User[]>(url);
  }

  isUserNameUnique(id: string, userName: string): Observable<boolean> {
    var accessPoint = this.accessPointUrl + 'isusernameunique';
    return this.http.post<boolean>(accessPoint, { id: id, userName: userName }, { headers: this.headers });
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.accessPointUrl, user, { headers: this.headers })
      .pipe(
        tap(() => this.notifyDatabaseUpdated())
      );
  }

  update(user: User): Observable<void> {
    return this.http.put<void>(this.appendIdToUrl(user.id), user, { headers: this.headers })
      .pipe(
        tap(() => this.notifyDatabaseUpdated())
      );
  }

  activate(id: number): Observable<void> {
    let headers = new HttpHeaders({
      'Content-Length': '0'
    });
    let url = `${this.accessPointUrl}/activate/${id}`;
    return this.http.put<void>(url, headers);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.appendIdToUrl(id))
      .pipe(
        tap(() => this.notifyDatabaseUpdated())
      );
  }

  private notifyDatabaseUpdated() {
    this.databaseUpdated.next();
  }

  private appendIdToUrl(id: string) {
    return this.accessPointUrl + id;
  }
}
