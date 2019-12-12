import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { SeriesVideoListComponent } from './series-video-list/series-video-list.component';
import { MaterialModule } from '../material/material.module';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { ContentVideoListComponent } from './content-video-list/content-video-list.component';
import { AdminVideoListComponent } from './admin-video-list/admin-video-list.component';
import { VideoEditorComponent } from './video-editor/video-editor.component';
import { ReviewModule } from '../review/review.module';

@NgModule({
    declarations: [VideoComponent, SeriesVideoListComponent, ContentVideoListComponent, AdminVideoListComponent, VideoEditorComponent],
    imports: [
        CommonModule,
        MaterialModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        ReviewModule
    ]
})
export class VideoModule { }
