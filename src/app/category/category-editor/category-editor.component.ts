import { Component, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { map } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-category-editor',
    templateUrl: './category-editor.component.html',
    styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnChanges {
    @Input() categoryId: number;
    @Output() editorClosed: EventEmitter<void> = new EventEmitter();

    categoryForm: FormGroup;

    readonly errorMessageEmptyName = "The name field must be filled.";

    constructor(private categoryService: CategoryService, private errorHandlerService: ErrorHandlerService, private formBuilder: FormBuilder) {
        this.setForm(0, '');
    }

    get pageHeader(): string {
        return this.isNewCategory ? "Add category" : "Edit category";
    }

    get isNewCategory(): boolean {
        return this.categoryId === 0;
    }

    get name() {
        if (this.categoryForm === undefined) {
            return '';
        }
        return this.categoryForm.get('name');
    }

    get errorMessageNonUnique() {
        return "A category with the name " + this.categoryForm.get('name').value + " already exists.";
    }

    ngOnChanges() {
        this.setCategory();
    }

    onSubmit() {
        if (this.isNewCategory) {
            this.saveCategory();
        }
        else {
            this.updateCategory();
        }
        this.closeEditor();
    }

    closeEditor() {
        this.editorClosed.emit();
    }

    isNameDuplicate() {
        var category = new Category();
        category.id = this.categoryForm.get("id").value;
        category.name = (<string>this.categoryForm.get("name").value).trim();
        return this.categoryService.isNameUnique(category).pipe(map(
            res => {
                return res ? null : { duplicate: true };
            })
        );
    }

    private setCategory() {
        if (!this.isNewCategory) {
            this.categoryService.get(this.categoryId).subscribe(
                (data: Category) => {
                    this.setForm(data.id, data.name);
                },
                (error: any) => this.errorHandlerService.handleError(error)
            );
        }
        else {
            this.setForm(0, '');
        }
    }

    private setForm(id: number, name: string) {
        this.categoryForm = this.formBuilder.group({
            id: id,
            name: [name, Validators.required, this.isNameDuplicate.bind(this)]
        });
    }

    private saveCategory() {
        this.categoryService.save(this.categoryForm.value).subscribe(
            _ => { },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private updateCategory() {
        this.categoryService.update(this.categoryForm.value).subscribe(
            _ => { },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }
}
