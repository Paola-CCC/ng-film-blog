import { Component, OnInit } from '@angular/core';
import { IPaginationPostsResponse, IPosts } from '@shared/interfaces';
import { PostService } from '@shared/services';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {
  console = console;
  /** Liste de Posts à afficher */
  postsList: IPosts[] = [];
  /** Message d'erreur */
  errorMessage : string = '';
  /** données à afficher */
  paginatedData: IPosts[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;
  pagesWithPosts : number = 0;

  constructor(private PostService: PostService) { }
 
  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this.PostService.getPaginatedData(this.currentPage, this.itemsPerPage).subscribe({
      next: (data: IPaginationPostsResponse) => {      
        this.paginatedData = data.results;
        this.totalItems = data.counterPosts;
        this.pagesWithPosts = data.pagesWithPosts
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getAllPosts();
  }

}
