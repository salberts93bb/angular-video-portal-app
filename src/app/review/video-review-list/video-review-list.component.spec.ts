import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoReviewListComponent } from './video-review-list.component';

describe('VideoReviewListComponent', () => {
  let component: VideoReviewListComponent;
  let fixture: ComponentFixture<VideoReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoReviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
