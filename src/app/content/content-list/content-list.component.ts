import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from '../../shared/services/content.service';
import { Content } from '../../shared/models/content';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AccountService } from '../../shared/services/account.service';
import { Category } from '../../shared/models/category';
import { ContentImageService } from '../../shared/services/content-image.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
    contents: MatTableDataSource<Content>;
    selectedContentIdEditor: number;
    selectedContentIdThumbnail: number;
    preselectedCategoryEditor: Category;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private contentService: ContentService, private contentImageService: ContentImageService, private errorHandlerService: ErrorHandlerService, private accountService: AccountService) { }

    get displayedColumns(): string[] {
        var result = ['name', 'description', 'type', 'category', 'numberOfLikes', 'numberOfDislikes'];
        if (this.accountService.isAdmin()) {
            result = result.concat(['edit', 'thumbnail', 'adddelete']);
        }
        return result;
    }

    get isEditorOpen(): boolean {
        return this.selectedContentIdEditor !== undefined;
    }

    get isThumbnailEditorOpen(): boolean {
        return this.selectedContentIdThumbnail !== undefined;
    }

    ngOnInit() {
        this.getContents();
        this.contentService.databaseUpdated.subscribe(
            () => this.getContents()
        );
    }

    delete(id: number) {
        this.contentImageService.delete(id).subscribe(
            _ => this.contentService.delete(id).subscribe(
                _ => { },
                (error: any) => this.errorHandlerService.handleError(error)
            )
        );

    }

    openEditor(content: Content) {
        this.closeThumbnailEditor();
        var id = content ? content.id : 0;
        if (content !== undefined) {
            this.preselectedCategoryEditor = new Category();
            this.preselectedCategoryEditor.id = content.categoryId;
            this.preselectedCategoryEditor.name = content.category;
        }
        else {
            this.preselectedCategoryEditor = undefined;
        }
        this.selectedContentIdEditor = id;
    }

    openThumbnailEditor(content: Content) {
        this.closeEditor();
        this.selectedContentIdThumbnail = content.id;
    }

    closeEditor() {
        this.selectedContentIdEditor = undefined;
        this.preselectedCategoryEditor = undefined;
    }

    closeThumbnailEditor() {
        this.selectedContentIdThumbnail = undefined;
    }

    private getContents() {
        this.contentService.getAll()
            .subscribe(
                (data: Content[]) => this.setDatasource(data),
                (error: any) => this.errorHandlerService.handleError(error)
            );
    }

    private setDatasource(contents: Content[]) {
        this.contents = new MatTableDataSource(contents);
        this.contents.paginator = this.paginator;
        this.contents.sort = this.sort;
    }
}
