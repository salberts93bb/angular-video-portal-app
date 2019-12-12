import { Component, OnInit, Input } from '@angular/core';
import { LoginModel } from '../../shared/models/login-model';
import { AccountService } from '../../shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotifierTypes } from '../../enumerations/notifier-types.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginModel: LoginModel;
    hidePassword: boolean = true;
    returnUrl: string;
    private successfulLoginMessage = "Logged in successfully";

    constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router, private notifier: NotifierService) { }

    ngOnInit() {
        this.loginModel = new LoginModel();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.accountService.login(this.loginModel).subscribe(
            response => {
                let token = response.token;
                localStorage.setItem("jwt", token);
                this.notifier.notify(NotifierTypes[NotifierTypes.success], this.successfulLoginMessage);
                if (this.accountService.isAdmin()) {
                    this.router.navigate(["admin"]);
                }
                else {
                    this.router.navigateByUrl(this.returnUrl);
                }
            }, error => {
                this.notifier.notify(NotifierTypes[NotifierTypes.error], this.getErrorMessage(error));
            }
        );
    }

    toggleHide() {
        this.hidePassword = !this.hidePassword;
    }

    private getErrorMessage(error: HttpErrorResponse) {
        if (error.status === 400) {
            return "Invalid login attempt. Please try again.";
        }
        else {
            return "An internal server error occurred. Please try again later or contact support.";
        }
    }
}
