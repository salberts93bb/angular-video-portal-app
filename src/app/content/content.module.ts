import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { MaterialModule } from '../material/material.module';
import { CategoryModule } from '../category/category.module';
import { ContentSearchResultListComponent } from './content-search-result-list/content-search-result-list.component';
import { ContentSearchResultComponent } from './content-search-result/content-search-result.component';
import { RouterModule } from '@angular/router';
import { ContentThumbnailEditorComponent } from './content-thumbnail-editor/content-thumbnail-editor.component';

@NgModule({
    declarations: [ContentListComponent, ContentEditorComponent, ContentSearchResultListComponent, ContentSearchResultComponent, ContentThumbnailEditorComponent],
    imports: [
        CommonModule,
        MaterialModule,
        CategoryModule,
        RouterModule
    ]
})
export class ContentModule { }
