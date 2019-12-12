import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { MaterialModule } from '../material/material.module';
import { CategorySelectorComponent } from "./category-selector/category-selector.component";



@NgModule({
    declarations: [CategoryListComponent, CategoryEditorComponent, CategorySelectorComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CategorySelectorComponent
    ]
})
export class CategoryModule { }
