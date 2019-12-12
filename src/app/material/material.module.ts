import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatCardModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatCheckboxModule } from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatCheckboxModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MaterialFileInputModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule
    ]
})
export class MaterialModule { }
