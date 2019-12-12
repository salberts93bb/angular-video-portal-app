import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    private accessPointUrl: string = environment.apiUrl + 'account/';
    private adminRole: string = 'Admin';
    private tokenName: string = 'jwt';

    constructor(private http: HttpClient) { }

    login(loginModel: LoginModel): Observable<any> {
        var loginUrl = this.accessPointUrl + "login";
        return this.http.post(loginUrl, loginModel, { headers: this.headers });
    }

    logout() {
        localStorage.removeItem("jwt");
    }

    isLoggedIn() {
        return Boolean(this.getToken());
    }

    isAdmin(): boolean {
        if (this.isLoggedIn()) {
            let decodedJwtData = this.decodeToken();
            return decodedJwtData.role === this.adminRole;
        }        
        return false;
    }

    private getToken(): string {
        return localStorage.getItem(this.tokenName);
    }

    private decodeToken(): any {
        let token = this.getToken();
        let jwtData = token.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        return JSON.parse(decodedJwtJsonData)
    }
}
