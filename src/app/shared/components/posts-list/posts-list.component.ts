import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosts } from '@shared/interfaces';
import { PostService } from '@shared/services';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  /** Message d'erreur */
  errorMessage : string = '';
  console = console;
  @Input() titleSection: string = '';
  /** liste de posts à afficher */
  @Input() postsListItems: IPosts[] = [];
  
  constructor(private router: Router) { }

  ngOnInit(): void {}

  get locationUrl(){
    return this.router.url ;
  }
}
