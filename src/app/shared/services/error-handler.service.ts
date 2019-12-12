import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
    public errorMessage: string = '';

    constructor(private router: Router) { }

    public handleError(error: HttpErrorResponse) {
        this.createErrorMessage(error);
        switch (error.status) {
            case 500:
                this.handle500Error(error);
                break;
            case 401:
                this.handle401Error(error);
                break;
            case 404:
                this.handle404Error(error);
                break;
            default:
                this.handleOtherError(error);
                break;
        }
    }

    private handle500Error(error: HttpErrorResponse) {
        this.router.navigate(['/500']);
    }

    private handle401Error(error: HttpErrorResponse) {
        this.router.navigate(['/401']);
    }

    private handle404Error(error: HttpErrorResponse) {
        this.router.navigate(['/404']);
    }

    private handleOtherError(error: HttpErrorResponse) {
        this.router.navigate(['/error']);
    }

    private createErrorMessage(error: HttpErrorResponse) {
        this.errorMessage = error.error ? error.error : error.statusText;
    }
}
