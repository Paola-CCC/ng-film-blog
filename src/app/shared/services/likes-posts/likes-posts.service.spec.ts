/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LikesPostsService } from './likes-posts.service';

describe('Service: LikesPosts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LikesPostsService]
    });
  });

  it('should ...', inject([LikesPostsService], (service: LikesPostsService) => {
    expect(service).toBeTruthy();
  }));
});
