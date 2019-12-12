import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { AuthorizationService } from './shared/services/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    
    private tokenExpiredMessage: string = "The session has expired. Please sign in again";
    private notLoggedInMessage: string = "Login is required to perform this action";
    constructor(private authorizationService: AuthorizationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const allowedRoles = route.data.allowedRoles;
        const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

        if (!isAuthorized) {
            this.router.navigate(['/login']);
        }
        return isAuthorized;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}
