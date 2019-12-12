import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotifierService } from 'angular-notifier';
import { NotifierTypes } from '../../enumerations/notifier-types.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private tokenExpiredMessage: string = "The session has expired. Please sign in again";
    private notLoggedInMessage: string = "Login is required to perform this action";
    private notAuthorizedMessage: string = "You are not allowed to perform this action";

    constructor(private jwtHelperService: JwtHelperService, private notifier: NotifierService) { }

    isAuthorized(allowedRoles: string[]): boolean {
        const token = this.getToken();

        if (!this.isLoggedIn()) {
            this.notifier.notify(NotifierTypes[NotifierTypes.info], this.notLoggedInMessage);
            return false;
        }
        else if (this.jwtHelperService.isTokenExpired(token)) {
            this.notifier.notify(NotifierTypes[NotifierTypes.info], this.tokenExpiredMessage);
            return false;
        }

        const decodeToken = this.jwtHelperService.decodeToken(token);
        var isAuthorized = allowedRoles == null || allowedRoles.length === 0 || allowedRoles.includes(decodeToken['role']);
        if (!isAuthorized) {
            this.notifier.notify(NotifierTypes[NotifierTypes.info], this.notAuthorizedMessage);
        }

        return isAuthorized;
    }

    getUserName(): string {
        const decokeToken = this.getDecodeToken();
        return decokeToken['unique_name'];
    }

    isAdmin(): boolean {
        const decodeToken = this.getDecodeToken();
        return decodeToken['role'] === 'Admin';
    }

    getDecodeToken(): string {
        const token = this.getToken();
        return this.jwtHelperService.decodeToken(token);
    }

    getToken(): string {
        return localStorage.getItem('jwt');
    }

    isLoggedIn(): boolean {
        return this.jwtHelperService.decodeToken(this.getToken());
    }
}
