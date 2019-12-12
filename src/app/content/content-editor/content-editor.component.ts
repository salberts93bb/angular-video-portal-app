import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '../../shared/services/content.service';
import { Content } from '../../shared/models/content';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ContentTypes } from '../../enumerations/content-types.enum';
import { Category } from '../../shared/models/category';
import { map } from 'rxjs/operators';
import { ContentImageService } from '../../shared/services/content-image.service';

@Component({
    selector: 'app-content-editor',
    templateUrl: './content-editor.component.html',
    styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit, OnChanges {
    @Input() contentId: number;
    @Input() preselectedCategory: Category;
    @Output() editorClosed: EventEmitter<void> = new EventEmitter()
    contentForm: FormGroup;
    contentTypes: string[] = [ContentTypes[ContentTypes.Movie], ContentTypes[ContentTypes.Series]];

    constructor(private contentService: ContentService,
        private contentImageService: ContentImageService,
        private errorHandlerService: ErrorHandlerService,
        private formBuilder: FormBuilder) {
        this.setEmptyForm();
    }

    get pageHeader(): string {
        return this.isNewContent ? "Add content" : "Edit content";
    }

    get isNewContent(): boolean {
        return this.contentId === 0;
    }

    get feedbackName(): string {
        var name = this.contentForm ? this.contentForm.get('name').value : undefined;
        return name === '' ? "Please enter a name" : "There already exists content with the name " + name;
    }

    ngOnChanges() {
        this.setContent();
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.isNewContent) {
            this.saveContent();
        }
        else {
            this.updateContent();
        }
        this.closeEditor();
    }

    closeEditor() {
        this.editorClosed.emit();
    }

    isNameDuplicate() {
        var id = this.contentForm.get("id").value;
        var name = (<string>this.contentForm.get("name").value).trim();
        return this.contentService.isNameUnique(id, name).pipe(map(
            res => {
                return res ? null : { duplicate: true };
            })
        );
    }

    changeCategory(category: Category) {
        this.contentForm.patchValue({
            "categoryId": category.id,
            "category": category.name
        });
    }

    private saveContent() {
        this.contentService.save(this.contentForm.value).subscribe(
            (data: any) => this.saveImage(data.id),
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private saveImage(contentId: number) {
        this.contentImageService.save(this.contentForm.get('image').value, contentId).subscribe(
            _ => { },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private updateContent() {
        var contentId = this.contentId;
        var imageName = this.contentForm.get("name").value;
        this.contentService.update(this.contentForm.value).subscribe(
            _ => this.contentImageService.patchName(contentId, imageName).subscribe(),
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private setContent() {
        if (!this.isNewContent) {
            this.contentService.get(this.contentId).subscribe(
                (data: Content) => this.setFormFromContent(data),
                (error: any) => this.errorHandlerService.handleError(error)
            );
        }
        else {
            this.setEmptyForm();
        }
    }

    private setFormFromContent(content: Content) {
        this.setForm(content.id,
            content.name,
            content.description,
            content.type,
            content.categoryId,
            content.category);
    }

    private setEmptyForm() {
        this.setForm(0, '', '', '', 0, '');
    }

    private setForm(id: number, name: string, description: string, type: string, categoryId: number, category: string) {
        this.contentForm = this.formBuilder.group({
            id: id,
            name: [name, Validators.required, this.isNameDuplicate.bind(this)],
            description: description,
            type: [type, Validators.required],
            categoryId: [categoryId, Validators.required],
            category: [category, Validators.required],
            image: ''
        });
    }
}
