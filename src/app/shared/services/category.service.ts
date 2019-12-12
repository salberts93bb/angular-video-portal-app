import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private accessPointUrl: string = environment.apiUrl + 'category/';
    databaseUpdated: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.accessPointUrl);
    }

    get(id: number): Observable<Category> {
        return this.http.get<Category>(this.appendIdToUrl(id));
    }
    
    save(category: Category): Observable<Category> {
        return this.http.post<Category>(this.accessPointUrl, category, { headers: this.headers })
            .pipe(
                tap(() => this.notifyDatabaseUpdated())
            );
    }

    isNameUnique(category: Category): Observable<boolean> {
        var accessPoint = this.accessPointUrl + 'isnameunique';
        return this.http.post<boolean>(accessPoint, category, { headers: this.headers });
    }

    update(category: Category): Observable<void> {
        return this.http.put<void>(this.appendIdToUrl(category.id), category, { headers: this.headers })
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
