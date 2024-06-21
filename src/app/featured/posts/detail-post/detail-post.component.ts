import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments, IPosts } from '@shared/interfaces';
import { AuthService, CommentsService, PostService } from '@shared/services';
import { LikesPostsService } from '@shared/services/likes-posts/likes-posts.service';


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
  /** bouton like est cliqué */
  btnLikesSelected: boolean | null = null;
  /** bouton dislike est cliqué */
  btnDislikesSelected: boolean | null = null;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,  
    private postService: PostService, 
    private commentsService: CommentsService,
    private likesPostsService: LikesPostsService
  ) {}


  ngOnInit(): void {
    let id =  this.route.snapshot.paramMap.get('id');
    this.postId = Number(id);  
    this.userId = this.authService.userDatasStored.id;
    this.getPost();

  }
  /** Affiche tous les posts */
  getPost() {
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
        this.getPost();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    })

    this.commentText = '';
  }

  addPostLike() {
    if( this.btnLikesSelected !== true ) {
      this.btnLikesSelected = true;
      this.addlikesPosts();
    } else {
      this.btnLikesSelected = false;
      this.removelikesPosts();
    }
  }

  addPostDislike() {
    if( this.btnDislikesSelected !== true ) {
      this.btnDislikesSelected = true;
      this.addDislikesPosts();
    } else {
      this.btnDislikesSelected = false;
      this.removeDislikesPosts();
    }
  }

  /** Ajouter un like */
  addlikesPosts() {
    this.likesPostsService.addLikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        this.getPost();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  /** Supprimer un like */
  removelikesPosts() {
    this.likesPostsService.removeLikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        this.getPost();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  /** Ajouter un dislike */
  addDislikesPosts() {
    this.likesPostsService.addDislikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        this.getPost();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  /** Supprimer un dislike */
  removeDislikesPosts() {
    this.likesPostsService.removeDislikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        this.getPost();
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }
}
