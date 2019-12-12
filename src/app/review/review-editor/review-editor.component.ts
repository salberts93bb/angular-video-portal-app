import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { VideoReviewService } from 'src/app/shared/services/video-review.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VideoReview } from 'src/app/shared/models/video-review';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-review-editor',
  templateUrl: './review-editor.component.html',
  styleUrls: ['./review-editor.component.css']
})
export class ReviewEditorComponent implements OnChanges {
  @Input() id: number;
  @Input() videoId: number;
  @Input() contentType: string;
  @Output() editFinished: EventEmitter<void> = new EventEmitter<void>();
  private userName: string;
  form: FormGroup;

  get isEditOn() {
    return this.id !== undefined;
  }
  get header() {
    return this.isEditOn ? "Edit comment" : "Leave a comment";
  }

  constructor(private videoReviewService: VideoReviewService,
    private authorizationService: AuthorizationService,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder) { }

  ngOnChanges() {
    this.userName = this.authorizationService.getUserName();
    if (this.isEditOn) {
      this.videoReviewService.get(this.id, this.contentType).subscribe(
        (data: VideoReview) => this.setFormFromReview(data),
        (error: any) => this.errorHandlerService.handleError(error)
      );
    }
    else {
      this.clearForm();
    }
  }

  onSubmit() {
    if (this.isEditOn) {
      this.update();
    }
    else {
      this.save();
    }
    this.finishEdit();
  }

  finishEdit() {
    this.clearForm();
    this.editFinished.emit();
  }

  private save() {
    this.videoReviewService.save(this.form.value, this.contentType).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private update() {
    this.videoReviewService.update(this.form.value, this.contentType).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private setFormFromReview(videoReview: VideoReview) {
    this.setForm(videoReview.id, videoReview.userName, videoReview.comment);
  }

  private clearForm() {
    this.setForm(0, this.userName, '');
  }

  private setForm(id: number, userName: string, comment: string) {
    this.form = this.formBuilder.group({
      id: id,
      videoId: this.videoId,
      userName: userName,
      comment: comment,
      datePosted: new Date(),
      contentType: this.contentType
    });
  }
}
