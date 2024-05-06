import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IComments } from 'src/app/_models/comments/comments.model';
import { IPosts } from 'src/app/_models/post/post.model';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { CommentsService } from 'src/app/_services/comments/comments.service';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  /** représente l'Id du post */
  postId : number = 1;
  console = console;
  errorMessage : string = '';
  post: any;
  userId: number| null = 13;
  /** commentaire de l'utlisateur */
  commentText: string = '';
  /** listes de commentaires */
  commentsList: IComments[] = [];

  constructor(private route: ActivatedRoute , private authService: AuthService,    private postService : PostService , private commentsService : CommentsService) {}


  ngOnInit(): void {
    let id =  this.route.snapshot.paramMap.get('id');
    this.postId = Number(id);  
    this.userId = this.authService.userDatasStored.id;
    this.getAllPosts();

  }
  /** Affiche tous les posts */
  getAllPosts() {
    this.postService.getOnePost(this.postId).subscribe({
      next: data => {
        this.post = data[0];
        this.commentsList = this.post.comments;        
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    });
  }

  addComment() {
    this.commentsService.addNewComment(this.commentText, this.userId, this.postId).subscribe({
      next: data => {
        this.console.log( " add " ,data)
        this.getAllPosts();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    })
  }

}
