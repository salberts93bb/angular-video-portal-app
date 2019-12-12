import { TestBed } from '@angular/core/testing';

import { VideoReviewService } from './video-review.service';

describe('VideoReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoReviewService = TestBed.get(VideoReviewService);
    expect(service).toBeTruthy();
  });
});
