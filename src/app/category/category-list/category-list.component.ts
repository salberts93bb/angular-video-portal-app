import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AccountService } from '../../shared/services/account.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    categories: MatTableDataSource<Category>;
    selectedCategoryId: number;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private categoryService: CategoryService, private errorHandlerService: ErrorHandlerService, private accountService: AccountService) { }

    get displayedColumns(): string[] {
        if (this.accountService.isAdmin()) {
            return ['name', 'edit', 'delete', 'add'];
        }
        return ['name'];
    }

    ngOnInit() {
        this.getCategories();
        this.categoryService.databaseUpdated.subscribe(
            () => this.getCategories()
        );
    }

    delete(id: number) {
        this.categoryService.delete(id).subscribe(
            undefined,
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    isEditorOpen(): boolean {
        return this.selectedCategoryId !== undefined;
    }

    openEditor(categoryId: number) {
        if (categoryId === undefined) {
            categoryId = 0;
        }
        this.selectedCategoryId = categoryId;
    }

    closeEditor() {
        this.selectedCategoryId = undefined;
    }

    private getCategories() {
        this.categoryService.getAll()
            .subscribe(
                (data: Category[]) => this.setDatasource(data),
                (error: any) => this.errorHandlerService.handleError(error)
            )
    }

    private setDatasource(categories: Category[]) {
        this.categories = new MatTableDataSource(categories);
        this.categories.paginator = this.paginator;
        this.categories.sort = this.sort;
    }
}
