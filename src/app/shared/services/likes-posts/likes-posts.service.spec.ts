/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LikesPostsService } from './likes-posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: LikesPosts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LikesPostsService]
    });
  });

  it('should ...', inject([LikesPostsService], (service: LikesPostsService) => {
    expect(service).toBeTruthy();
  }));
});
