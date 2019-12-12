import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContentImageService {

    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private accessPointUrl: string = environment.apiUrl + 'ContentImage/';

    constructor(private http: HttpClient) { }

    get(contentId: number) {
        return this.http.get<any>(this.appendContentIdToUrl(contentId));
    }

    save(image: any, contentId: number): Observable<any> {
        let formData = this.createFormData(image, contentId);
        return this.http.post<any>(this.accessPointUrl, formData);
    }

    update(image: any, contentId: number): Observable<void> {
        let formData = this.createFormData(image, contentId);
        return this.http.put<void>(this.appendContentIdToUrl(contentId), formData);
    }

    delete(contentId: number): Observable<void> {
        return this.http.delete<void>(this.appendContentIdToUrl(contentId));
    }

    patchName(contentId: number, imageName: string): Observable<any> {
        let jsonPatchDocument = [
            {
                "op": "replace",
                "path": "/imageName",
                "value": imageName
            }
        ];

        return this.http.patch<any>(this.appendContentIdToUrl(contentId), jsonPatchDocument, { headers: this.headers });
    }

    private createFormData(image: any, contentId: number): FormData {
        let formData: FormData = new FormData();
        formData.append('contentId', contentId.toString());
        formData.append('id', '0');
        formData.append('imageName', contentId.toString());
        formData.append('image', <File>image._files[0]);
        return formData;
    }

    private appendContentIdToUrl(contentId: number) {
        return this.accessPointUrl + contentId;
    }
}
