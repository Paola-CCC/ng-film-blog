import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post/post.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  /**Element à afficher */
  contents : any ;
  /** Message d'erreur */
  errorMessage : string = '';

  console = console

  constructor(private userService: UserService ,private postService : PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe({
        next: data => {
          this.contents = data;
        },
        error: err => {
          this.console.log(err);
          this.errorMessage = err;
        }
    });
  }


  navigateToElement(id : number): void {
    this.router.navigate(['/post' , id]);
  }

}
