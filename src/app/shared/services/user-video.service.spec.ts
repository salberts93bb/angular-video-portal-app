import { TestBed } from '@angular/core/testing';

import { UserVideoService } from './user-video.service';

describe('VideoReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserVideoService = TestBed.get(UserVideoService);
    expect(service).toBeTruthy();
  });
});
