import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Content } from '../models/content';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private accessPointUrl: string = environment.apiUrl + 'content/';
    databaseUpdated: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) { }

    getAll(): Observable<Content[]> {
        return this.http.get<Content[]>(this.accessPointUrl);
    }

    get(id: number): Observable<Content> {
        return this.http.get<Content>(this.appendIdToUrl(id));
    }

    searchByNameAndCategory(name: string, categoryName: string): Observable<Content[]> {
        var accessPoint = this.accessPointUrl + 'search/';
        return this.http.get<Content[]>(accessPoint, {
            params: {
                name: name,
                categoryName: categoryName
            }
        });
    }

    save(content: Content): Observable<Content> {
        return this.http.post<Content>(this.accessPointUrl, content, { headers: this.headers })
            .pipe(
                tap(() => this.notifyDatabaseUpdated())
            );
    }

    isNameUnique(id: number, name: string): Observable<boolean> {
        var accessPoint = this.accessPointUrl + 'isnameunique';
        return this.http.post<boolean>(accessPoint, { id: id, name: name }, { headers: this.headers });
    }

    update(content: Content): Observable<void> {
        return this.http.put<void>(this.appendIdToUrl(content.id), content, { headers: this.headers })
            .pipe(
                tap(() => this.notifyDatabaseUpdated())
            );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.appendIdToUrl(id))
            .pipe(
                tap(() => this.notifyDatabaseUpdated())
            );
    }

    private notifyDatabaseUpdated() {
        this.databaseUpdated.next();
    }

    private appendIdToUrl(id: number) {
        return this.accessPointUrl + id;
    }
}
