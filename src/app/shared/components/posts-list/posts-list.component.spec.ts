import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { PostService } from '@shared/services';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsListComponent],
      providers: [{ provide: PostService, useValue: mockPostService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;

    // Simuler une réponse pour getAll
    mockPostService.getAll.and.returnValue(of([]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called getAll from PostService on init', () => {
    expect(mockPostService.getAll).toHaveBeenCalled();
  });

  it('should set postsList with the data returned from PostService', () => {
    const mockPosts = [
      { id: 1, author: 'John Doe', content: 'Test Content', title: 'Test Title', createdAt: '2024-01-01' }
    ];

    mockPostService.getAll.and.returnValue(of(mockPosts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.postsList).toEqual(mockPosts);
  });

  it('should handle error when getAll fails', () => {
    const errorResponse = 'An error occurred';
    mockPostService.getAll.and.returnValue(throwError(() => new Error(errorResponse)));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.errorMessage).toEqual(errorResponse);
  });
});
