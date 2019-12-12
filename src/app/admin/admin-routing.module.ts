import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CategoryListComponent } from '../category/category-list/category-list.component';
import { ContentListComponent } from '../content/content-list/content-list.component';
import { ContentVideoListComponent } from '../video/content-video-list/content-video-list.component';
import { UserListComponent } from '../user/user-list/user-list.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['Admin'] },
        children:
            [
                { path: 'categories', component: CategoryListComponent },
                { path: 'content', component: ContentListComponent },
                { path: 'user', component: UserListComponent },
                { path: 'videos', component: ContentVideoListComponent },
                { path: '**', redirectTo: '', pathMatch: 'full' }
            ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
