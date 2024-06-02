import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments, IPosts } from '@interfaces';
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
  /** message d'erreur */
  errorMessage : string = '';
  /** Posts */
  post: IPosts;
  userId: number| null ;
  /** commentaire de l'utlisateur */
  commentText: string = '';
  /** listes de commentaires */
  commentsList: IComments[] = [];

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,  
    private postService: PostService, 
    private commentsService: CommentsService
  ) {}


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
