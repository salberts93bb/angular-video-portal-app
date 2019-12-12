import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './navigation/navigation.module';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthorizationService } from './shared/services/authorization.service';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AdminRoutingModule,
        AppRoutingModule,
        NavigationModule,
        NotifierModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("jwt")
            }
        })
    ],
    providers: [AuthorizationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
