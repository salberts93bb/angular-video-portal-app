import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { ContentModule } from './content/content.module';
import { ReviewModule } from './review/review.module';
import { ErrorModule } from './error/error.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { VideoModule } from './video/video.module';

import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerComponent } from './error/internal-server/internal-server.component';
import { UnexpectedErrorComponent } from './error/unexpected-error/unexpected-error.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { ContentSearchResultListComponent } from './content/content-search-result-list/content-search-result-list.component';
import { VideoComponent } from './video/video/video.component';
import { SeriesVideoListComponent } from './video/series-video-list/series-video-list.component';
import { ActivateComponent } from './user/activate/activate.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'activate/:id', component: ActivateComponent },
    { path: 'content', component: ContentSearchResultListComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'search', component: ContentSearchResultListComponent, canActivate: [AuthGuard] },
    { path: 'watch/:contentType/:id', component: VideoComponent, canActivate: [AuthGuard] },
    { path: 'series/:id', component: SeriesVideoListComponent, canActivate: [AuthGuard] },
    { path: '401', redirectTo: '/login' },
    { path: '404', component: NotFoundComponent },
    { path: '500', component: InternalServerComponent },
    { path: 'error', component: UnexpectedErrorComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AccountModule,
        CategoryModule,
        ContentModule,
        ReviewModule,
        ErrorModule,
        UserModule,
        AdminModule,
        VideoModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
