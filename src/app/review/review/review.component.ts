import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { VideoReview } from 'src/app/shared/models/video-review';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { VideoReviewService } from 'src/app/shared/services/video-review.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: VideoReview;
  @Output() editClicked: EventEmitter<number> = new EventEmitter<number>();

  get currentUser(): string {
    return this.authorizationService.getUserName();
  }

  get mayEdit(): boolean {
    return this.isFromCurrentUser() || this.isCurrentUserAdmin();
  }

  get postedString(): string {
    return `Last edited ${this.review.datePosted.toLocaleDateString()} at ${this.review.datePosted.toLocaleTimeString()}`;
  }
  constructor(private videoReviewService: VideoReviewService, private errorHandlerService: ErrorHandlerService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.review.datePosted = new Date(this.review.datePosted);
  }

  edit() {
    this.editClicked.emit(this.review.id);
  }

  delete() {
    this.videoReviewService.delete(this.review.id, this.review.contentType)
      .subscribe(
        _ => { },
        (error: any) => this.errorHandlerService.handleError(error)
      );
  }

  private isFromCurrentUser() {
    return this.review.userName === this.authorizationService.getUserName();
  }

  private isCurrentUserAdmin() {
    return this.authorizationService.isAdmin();
  }
}
