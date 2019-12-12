import { Component, OnInit } from '@angular/core';
import { Content } from '../../shared/models/content';
import { ContentService } from '../../shared/services/content.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Category } from '../../shared/models/category';

@Component({
    selector: 'app-content-search-result-list',
    templateUrl: './content-search-result-list.component.html',
    styleUrls: ['./content-search-result-list.component.css']
})
export class ContentSearchResultListComponent implements OnInit {
    searchResults: Content[] = [];
    category: Category = undefined;
    searchForm: FormGroup;
    get noResults(): boolean {
        return this.searchResults.length === 0;
    }

    constructor(private contentService: ContentService,
        private errorHandlerService: ErrorHandlerService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.initialize();
    }

    search() {
        var name = this.searchForm.get('name').value;
        var categoryName = this.searchForm.get('categoryName').value;
        this.contentService.searchByNameAndCategory(name, categoryName).subscribe(
            (data: Content[]) => this.searchResults = data,
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    reset() {
        this.initialize();
    }

    changeCategory(category: Category) {
        this.searchForm.patchValue({
            "categoryName": category.name
        });
        this.category = category;
    }

    private initializeForm() {
        this.searchForm = this.formBuilder.group({
            name: "",
            categoryName: ""
        });
    }

    private initialize() {
        this.category = undefined;
        this.initializeForm();
        this.search();
    }
}
