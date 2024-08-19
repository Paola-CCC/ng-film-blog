import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosts } from '@shared/interfaces';
import { PostService } from '@shared/services';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  /** Liste de Posts à afficher */
  postsList: IPosts[] = [];
  /** Message d'erreur */
  errorMessage : string = '';

  console = console

  constructor(private PostService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.PostService.getFrontListPost().subscribe({
        next: data => {
          this.postsList = data;
        },
        error: err => {
          this.console.log(err);
          this.errorMessage = err.message;
        }
    });
  }
}
