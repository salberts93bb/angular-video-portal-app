import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../shared/services/video.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Content } from '../../shared/models/content';
import { Video } from '../../shared/models/video';
import { ContentService } from '../../shared/services/content.service';
import { forkJoin } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
    selector: 'app-series-video-list',
    templateUrl: './series-video-list.component.html',
    styleUrls: ['./series-video-list.component.css']
})
export class SeriesVideoListComponent implements OnInit {
    series: Content;
    videos: Video[];
    noVideos: boolean = false;
    constructor(private contentService: ContentService, private errorHandlerService: ErrorHandlerService, private videoService: VideoService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            mergeMap((params: ParamMap) => {
                let id = +params.get('id');
                let videos$ = this.videoService.getAllEpisodes(id);
                let content$ = this.contentService.get(id);
                return forkJoin([videos$, content$]);
            }
            )).subscribe(
                ([videos, content]) => {
                    this.videos = videos;
                    this.series = content;
                },
                (error: any) => {
                    console.log(error);
                    this.noVideos = true;
                }
            );
    }

    open(video: Video) {
        this.router.navigate([`/watch/series/${video.id}`]);
    }

    getEpisodeNumber(video: Video) {
        return this.videos.indexOf(video) + 1;
    }
}
