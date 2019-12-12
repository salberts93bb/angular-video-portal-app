import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ContentImageService } from '../../shared/services/content-image.service';
import { ContentService } from '../../shared/services/content.service';
import { Content } from '../../shared/models/content';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-content-thumbnail-editor',
    templateUrl: './content-thumbnail-editor.component.html',
    styleUrls: ['./content-thumbnail-editor.component.css']
})
export class ContentThumbnailEditorComponent implements OnChanges {
    @Input() contentId: number;
    @Output() editorClosed: EventEmitter<void> = new EventEmitter();
    contentName: string;
    imageName: string;
    image: string;

    form: FormGroup = this.formBuilder.group({
        fileInput: ['', Validators.required]
    });

    constructor(private contentImageService: ContentImageService, private contentService: ContentService, private errorHandlerService: ErrorHandlerService, private formBuilder: FormBuilder) { }

    private get hasContentNameChanged(): boolean {
        return this.contentName !== this.imageName;
    }

    ngOnChanges() {
        this.setValues();
    }

    closeEditor() {
        this.editorClosed.emit();
    }

    onSubmit() {
        this.update();
        this.closeEditor();
    }

    private update() {
        this.contentImageService.update(this.form.get('fileInput').value, this.contentId).subscribe(
            _ => { },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private setValues() {
        this.contentService.get(this.contentId).subscribe(
            (data: Content) => {
                this.contentName = data.name;
                this.setImageValues();
            },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private setImageValues() {
        this.contentImageService.get(this.contentId).subscribe(
            (data: any) => {
                this.imageName = data.imageName;
                this.image = data.image;
            },
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }
}
