import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
    declarations: [AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule
    ]
})
export class AdminModule { }
