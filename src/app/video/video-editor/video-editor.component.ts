import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { VideoService } from 'src/app/shared/services/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from 'src/app/shared/models/video';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';

@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.css']
})
export class VideoEditorComponent implements OnChanges {
  @Input() videoId: number;
  @Input() contentId: number;
  @Input() contentType: string;
  @Output() editorClosed: EventEmitter<void> = new EventEmitter();
  videoForm: FormGroup;

  constructor(private videoService: VideoService, private errorHandlerService: ErrorHandlerService, private formBuilder: FormBuilder) { }

  ngOnChanges() {
    console.log(this.videoId);
    this.setVideo();
  }

  get isNew(): boolean {
    return this.videoId === 0;
  }

  get header(): string {
    return this.isNew ? this.isSeries ? 'Add video' : 'Upload video' : 'Edit video';
  }

  private get isSeries(): boolean {
    return this.contentType === ContentTypes[ContentTypes.Series];
  }

  onSubmit() {
    if (this.isNew) {
      this.save();
    }
    else {
      this.update();
    }
    this.closeEditor();
  }

  closeEditor() {
    this.editorClosed.emit();
  }

  private save() {
    let formData = this.createFormData();
    this.videoService.save(formData, this.contentType).subscribe(
      () => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private update() {
    let formData = this.createFormData();
    this.videoService.update(this.videoId, formData, this.contentType).subscribe(
      () => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private setVideo() {
    if (!this.isNew) {
      this.videoService.get(this.videoId, this.contentType).subscribe(
        (data: Video) => this.setFormFromVideo(data),
        (error: any) => this.errorHandlerService.handleError(error)
      );
    }
    else {
      this.setEmptyForm();
    }
  }

  private setFormFromVideo(video: Video) {
    this.setForm(video.id,
      video.contentId,
      video.name,
      video.description,
      0,
      video.releaseDate,
      video.contentType);
  }

  private setEmptyForm() {
    this.setForm(0, this.contentId, '', '', 0, new Date(), this.contentType);
  }

  private setForm(id: number, contentId: number, name: string, description: string, duration: number, releaseDate: Date, contentType: string) {
    this.videoForm = this.formBuilder.group({
      id: id,
      contentId: contentId,
      name: [name, Validators.required],
      duration: duration,
      description: description,
      releaseDate: releaseDate,
      file: '',
      contentType: contentType
    });
  }

  private createFormData(): FormData {
    let formData: FormData = new FormData();
    formData.append('id', this.videoForm.get('id').value);
    formData.append('contentId', this.videoForm.get('contentId').value);
    formData.append('name', this.videoForm.get('name').value);
    formData.append('duration', this.videoForm.get('duration').value);
    formData.append('description', this.videoForm.get('description').value);
    let releaseDate = new Date(this.videoForm.get('releaseDate').value)
    formData.append('releaseDate', releaseDate.toDateString());
    let fileFormValue = this.videoForm.get('file').value;
    let file = fileFormValue ? <File>fileFormValue._files[0] : undefined;
    formData.append('file', file);
    formData.append('contentType', this.videoForm.get('contentType').value);
    return formData;
  }
}
