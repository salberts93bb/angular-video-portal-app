import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotifierTypes } from '../../enumerations/notifier-types.enum';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    @Input() appName: string;
    private logoutSuccessfulMessage: string = "Log out successful!";
    constructor(private accountService: AccountService, private router: Router, private notifier: NotifierService) { }

    ngOnInit() {
    }

    logout() {
        this.accountService.logout();
        this.notifier.notify(NotifierTypes[NotifierTypes.success], this.logoutSuccessfulMessage);
        this.router.navigate(["login"]);
    }

    isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }

    isLoggedOut(): boolean {
        return !this.accountService.isLoggedIn();
    }

    isAdmin(): boolean {
        return this.accountService.isAdmin();
    }
}
