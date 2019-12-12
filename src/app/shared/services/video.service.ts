import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Video } from '../models/video';
import { environment } from '../../../environments/environment';
import { ContentTypes } from '../../enumerations/content-types.enum';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private contentTypeSeries: string = ContentTypes[ContentTypes.Series].toLowerCase();
    private contentTypeMovie: string = ContentTypes[ContentTypes.Movie].toLowerCase();
    databaseUpdated: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) {
    }

    get(id: number, contentType: string): Observable<Video> {
        return this.http.get<Video>(this.getAccessPointUrlWithId(id, contentType));
    }

    getAllEpisodes(seriesId: number): Observable<Video[]> {
        let accessPointBase = this.getAccessPointUrl(this.contentTypeSeries) + "getallepisodes/";
        let accessPointUrl = this.appendIdToUrl(accessPointBase, seriesId);
        return this.http.get<Video[]>(accessPointUrl);
    }

    getVideo(movieId: number): Observable<Video> {
        let accessPointBase = this.getAccessPointUrl(this.contentTypeMovie) + 'getvideo/';
        let accessPointUrl = this.appendIdToUrl(accessPointBase, movieId);
        return this.http.get<Video>(accessPointUrl);
    }

    save(formData: FormData, contentType: string): Observable<any> {
        let url = this.getAccessPointUrl(contentType);
        return this.http.post<any>(url, formData).pipe(
            tap(() => this.notifyDatabaseUpdated())
        );
    }

    update(id: number, formData: FormData, contentType: string): Observable<any> {
        return this.http.put<any>(this.getAccessPointUrlWithId(id, contentType), formData).pipe(
            tap(() => this.notifyDatabaseUpdated())
        );
    }

    delete(id: number, contentType: string): Observable<any> {
        let url = this.getAccessPointUrlWithId(id, contentType);
        return this.http.delete<any>(url).pipe(
            tap(() => this.notifyDatabaseUpdated())
        );
    }

    private getAccessPointUrlWithId(id: number, contentType: string): string {
        return this.appendIdToUrl(this.getAccessPointUrl(contentType), id);
    }

    private getAccessPointUrl(contentType: string): string {
        if (contentType.toLowerCase() === this.contentTypeMovie) {
            return environment.apiUrl + 'videoinmovie/';
        }
        else if (contentType.toLowerCase() === this.contentTypeSeries) {
            return environment.apiUrl + 'videoinseries/';
        }
        return '';
    }

    private appendIdToUrl(accessPointUrl: string, id: number) {
        return accessPointUrl + id;
    }

    private notifyDatabaseUpdated() {
        this.databaseUpdated.next();
    }
}
