import { TestBed } from '@angular/core/testing';

import { UserContentService } from './user-content.service';

describe('ContentReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserContentService = TestBed.get(UserContentService);
    expect(service).toBeTruthy();
  });
});
