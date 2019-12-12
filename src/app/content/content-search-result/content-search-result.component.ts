import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../shared/models/content';
import { ContentImageService } from '../../shared/services/content-image.service';
import { UserContentService } from 'src/app/shared/services/user-content.service';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/shared/services/video.service';
import { Video } from 'src/app/shared/models/video';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { switchMap } from 'rxjs/operators';
import { UserVideoService } from 'src/app/shared/services/user-video.service';

@Component({
    selector: 'app-content-search-result',
    templateUrl: './content-search-result.component.html',
    styleUrls: ['./content-search-result.component.css']
})
export class ContentSearchResultComponent implements OnInit {
    @Input() content: Content;
    numberOfLikes: number;
    numberOfDislikes: number;

    private image: string;
    private userName: string;

    get imageSource(): string {
        return this.image ? 'data:image/jpg;base64,' + this.image : '';
    }

    private get isMovie(): boolean {
        return this.content && this.content.type === ContentTypes[ContentTypes.Movie];
    }

    constructor(private contentImageService: ContentImageService,
        private userContentService: UserContentService,
        private userVideoService: UserVideoService,
        private videoService: VideoService,
        private authorizationService: AuthorizationService,
        private errorHandlerService: ErrorHandlerService,
        private router: Router) { }

    ngOnInit() {
        this.userName = this.authorizationService.getUserName();
        this.setLikesAndDislikes();
        this.contentImageService.get(this.content.id).subscribe(
            (data: any) => this.image = data.image,
            (error: any) => { }
        );
    }

    open() {
        if (this.content.type === ContentTypes[ContentTypes.Movie]) {
            this.openMovie(this.content);
        }
        else if (this.content.type === ContentTypes[ContentTypes.Series]) {
            this.openSeries(this.content);
        }
    }

    private setLikesAndDislikes() {
        this.userContentService.getNumberOfLikes(this.content ? this.content.id : 0).subscribe(
            (data: number) => this.numberOfLikes = data
        );
        this.userContentService.getNumberOfDislikes(this.content ? this.content.id : 0).subscribe(
            (data: number) => this.numberOfDislikes = data
        );
    }

    private openMovie(content: Content) {
        this.videoService.getVideo(content.id).subscribe(
            (data: Video) => this.router.navigate([`/watch/movie/${data.id}`]),
            (error: any) => this.errorHandlerService.handleError(error)
        );
    }

    private openSeries(content: Content) {
        let routerLinkString = `/series/${content.id}`;
        this.router.navigate([routerLinkString]);
    }

    toggleLike() {
        if (this.isMovie) {
            this.toggleLikeVideo();
        }
        this.userContentService.toggleLike(this.content.id, this.userName).subscribe(
            () => this.setLikesAndDislikes()
        );
    }

    toggleDislike() {
        if (this.isMovie) {
            this.toggleDislikeVideo();
        }
        this.userContentService.toggleDislike(this.content.id, this.userName).subscribe(
            () => this.setLikesAndDislikes()
        );
    }

    private toggleLikeVideo() {
        this.videoService.getVideo(this.content.id).pipe(
            switchMap(
                (video: Video) => this.userVideoService.toggleLike(video.id, this.userName, video.contentType)
            )).subscribe();
    }

    private toggleDislikeVideo() {
        this.videoService.getVideo(this.content.id).pipe(
            switchMap(
                (video: Video) => this.userVideoService.toggleDislike(video.id, this.userName, video.contentType)
            )).subscribe();
    }
}
