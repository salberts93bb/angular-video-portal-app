import { Component, OnInit, Input } from '@angular/core';
import { VideoReview } from 'src/app/shared/models/video-review';
import { VideoReviewService } from 'src/app/shared/services/video-review.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-video-review-list',
  templateUrl: './video-review-list.component.html',
  styleUrls: ['./video-review-list.component.css']
})
export class VideoReviewListComponent implements OnInit {
  reviews: VideoReview[];
  selectedId: number;
  @Input() videoId: number;
  @Input() contentType: string;

  get noComments(): boolean {
    return !this.hasComments;
  }

  private get hasComments(): boolean {
    return this.reviews && this.reviews.length > 0;
  }

  constructor(private videoReviewService: VideoReviewService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.getReviews();
    this.videoReviewService.databaseUpdated.subscribe(
      () => this.getReviews()
    );
  }

  edit(id: number) {
    this.selectedId = id;
  }

  finishEdit() {
    this.selectedId = undefined;
  }

  private getReviews() {
    this.videoReviewService.getReviews(this.videoId, this.contentType).subscribe(
      (data: VideoReview[]) => this.reviews = data.reverse(),
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }
}
