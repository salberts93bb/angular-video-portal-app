import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoReviewListComponent } from './video-review-list/video-review-list.component';
import { ReviewComponent } from './review/review.component';
import { MaterialModule } from '../material/material.module';
import { ReviewEditorComponent } from './review-editor/review-editor.component';



@NgModule({
  declarations: [VideoReviewListComponent, ReviewComponent, ReviewEditorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    VideoReviewListComponent
  ]
})
export class ReviewModule { }
