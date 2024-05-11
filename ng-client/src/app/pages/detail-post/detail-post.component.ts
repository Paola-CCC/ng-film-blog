import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments, Posts } from '@models';
import { AuthService, CommentsService, PostService } from '@services';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  /** représente l'Id du post */
  postId : number = 1;
  console = console;
  errorMessage : string = '';
  post: Posts = new Posts() ;
  userId: number| null = 13;
  /** commentaire de l'utlisateur */
  commentText: string = '';
  /** listes de commentaires */
  commentsList: Comments[] = [];

  constructor(
    private route: ActivatedRoute , 
    private authService: AuthService,  
    private postService : PostService, 
    private commentsService : CommentsService) {}


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
        this.getAllPosts();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    })

    this.commentText = '';
  }

}
