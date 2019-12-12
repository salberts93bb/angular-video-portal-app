import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Content } from 'src/app/shared/models/content';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-content-video-list',
  templateUrl: './content-video-list.component.html',
  styleUrls: ['./content-video-list.component.css']
})
export class ContentVideoListComponent implements OnInit {
  contents: MatTableDataSource<Content>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name'];
  selectedContent: Content;

  constructor(private contentService: ContentService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.getContents();
  }

  showVideos(content: Content) {
    this.selectedContent = content;
    console.log(this.selectedContent);
  }

  isSelected(content: Content) {
    return this.selectedContent === content;
  }

  private getContents() {
    this.contentService.getAll()
      .subscribe(
        (data: Content[]) => this.setDatasource(data),
        (error: any) => this.errorHandlerService.handleError(error)
      );
  }

  private setDatasource(contents: Content[]) {
    this.contents = new MatTableDataSource(contents);
    this.contents.paginator = this.paginator;
    this.contents.sort = this.sort;
  }

}
