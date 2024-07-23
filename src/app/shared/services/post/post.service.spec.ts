import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';  // Ajustez le chemin d'importation selon la structure de votre projet
import { IPosts } from '@shared/interfaces';
import { of } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected posts (HttpClient called once)', (done: DoneFn) => {
    const expectedPosts: IPosts[] = [
      { id: 1, author: 'John Doe', content: 'Test Content', title: 'Test Title', createdAt: '2024-01-01' }
    ];

    httpClientSpy.get.and.returnValue(of(expectedPosts));

    service.getAll().subscribe({
      next: posts => {
        expect(posts).toEqual(expectedPosts);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
