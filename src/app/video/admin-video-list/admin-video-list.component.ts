import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Content } from 'src/app/shared/models/content';
import { VideoService } from 'src/app/shared/services/video.service';
import { ContentTypes } from 'src/app/enumerations/content-types.enum';
import { Video } from 'src/app/shared/models/video';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-admin-video-list',
  templateUrl: './admin-video-list.component.html',
  styleUrls: ['./admin-video-list.component.css']
})
export class AdminVideoListComponent implements OnChanges {
  @Input() content: Content;
  videos: MatTableDataSource<Video>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedVideo: Video;
  displayedColumns: string[] = ['name', 'adddelete'];
  isEditorOpen: boolean = false;

  constructor(private videoService: VideoService, private errorHandlerService: ErrorHandlerService) { }

  get addButtonText(): string {
    return this.isSeries ? "Add episode" : "Upload video";
  }

  get isSeries(): boolean {
    return this.content.type === ContentTypes[ContentTypes.Series];
  }

  get mayAdd(): boolean {
    return this.isSeries || !this.hasVideos;
  }

  get hasVideos(): boolean {
    return this.videos && this.videos.data.length !== 0;
  }

  get selectedVideoId(): number {
    return this.selectedVideo ? this.selectedVideo.id : 0;
  }

  ngOnChanges() {
    this.getVideos();
    this.videoService.databaseUpdated.subscribe(
      () => this.getVideos()
    );
  }

  openEditor(video: Video) {
    this.isEditorOpen = true;
    this.selectedVideo = video;
  }

  closeEditor() {
    this.isEditorOpen = false;
    this.selectedVideo = undefined;
  }

  isSelected(video: Video) {
    return this.selectedVideo === video;
  }

  delete(video: Video) {
    this.videoService.delete(video.id, video.contentType).subscribe(
      _ => { },
      (error: any) => this.errorHandlerService.handleError(error)
    );
  }

  private getVideos() {
    if (this.content.type === ContentTypes[ContentTypes.Movie]) {
      this.getVideosMovie();
    }
    else if (this.content.type === ContentTypes[ContentTypes.Series]) {
      this.getVideosSeries();
    }
  }

  private getVideosMovie() {
    this.videoService.getVideo(this.content.id)
      .subscribe(
        (data: Video) => this.setDatasource([data]),
        (error: any) => this.videos = undefined
      );
  }

  private getVideosSeries() {
    this.videoService.getAllEpisodes(this.content.id)
      .subscribe(
        (data: Video[]) => this.setDatasource(data),
        (error: any) => this.videos = undefined
      );
  }

  private setDatasource(videos: Video[]) {
    this.videos = new MatTableDataSource(videos);
    this.videos.paginator = this.paginator;
    this.videos.sort = this.sort;
  }
}
