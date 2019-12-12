import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../shared/services/video.service';
import { Video } from '../../shared/models/video';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserVideoService } from 'src/app/shared/services/user-video.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';
import { UserContentService } from 'src/app/shared/services/user-content.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    video: Video;
    loadError: boolean = false;
    numberOfLikes: number;
    numberOfDislikes: number;

    private videoBase64: any;
    private userName: string;

    get videoSource(): string {
        return this.videoBase64 ? 'data:video/mp4;base64,' + this.videoBase64 : '';
    }

    get dateUploadedString(): string {
        if (this.video && this.video.releaseDate) {
            return new Date(this.video.releaseDate).toLocaleDateString();
        }
        return 'Unknown';
    }

    get subtitle(): string {
        return `${this.video.contentType} - Uploaded: ${this.dateUploadedString}`;
    }

    get isMovie(): boolean {
        return this.video.contentType === ContentTypes[ContentTypes.Movie];
    }

    constructor(private videoService: VideoService,
        private contentReviewService: UserContentService,
        private videoReviewService: UserVideoService,
        private authorizationService: AuthorizationService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.userName = this.authorizationService.getUserName();
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.videoService.get(+params.get('id'), params.get('contentType'))
            )).subscribe(
                (data: Video) => {
                    this.loadError = false;
                    this.videoBase64 = data.videoData;
                    this.video = data;
                    this.setLikesAndDislikes();
                },
                (error: any) => this.loadError = true
            );
    }

    toggleLike() {
        if (this.isMovie) {
            this.contentReviewService.toggleLike(this.video.contentId, this.userName).subscribe();
        }
        this.videoReviewService.toggleLike(this.video.id, this.userName, this.video.contentType).subscribe(
            () => this.setLikesAndDislikes()
        );
    }

    toggleDislike() {
        if (this.isMovie) {
            this.contentReviewService.toggleDislike(this.video.contentId, this.userName).subscribe();
        }
        this.videoReviewService.toggleDislike(this.video.id, this.userName, this.video.contentType).subscribe(
            () => this.setLikesAndDislikes()
        );
    }

    private setLikesAndDislikes() {
        if (this.video) {
            this.videoReviewService.getNumberOfLikes(this.video.id, this.video.contentType).subscribe(
                (data: number) => this.numberOfLikes = data
            );
            this.videoReviewService.getNumberOfDislikes(this.video.id, this.video.contentType).subscribe(
                (data: number) => this.numberOfDislikes = data
            );
        }
    }
}
