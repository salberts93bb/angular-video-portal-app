import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(private accountService: AccountService) { }

    ngOnInit() {
    }

    isAdmin() {
        return this.accountService.isAdmin();
    }
}
