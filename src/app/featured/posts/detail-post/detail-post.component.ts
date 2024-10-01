import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments, IPosts } from '@shared/interfaces';
import { AuthService, CommentsService, HelperService, PostService } from '@shared/services';
import { LikesPostsService } from '@shared/services/likes-posts/likes-posts.service';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  /** représente l'Id du post */
  postId : number | null = null;
  console = console;
  /** message d'erreur */
  errorMessage : string = '';
  /** Posts */
  post: IPosts | undefined;
  /** user */
  userId: number| null = null;
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
    private likesPostsService: LikesPostsService,
    private helperService: HelperService
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
        if( this.postId !== null && this.userId !== null) {
          this.post = data[0];
          this.commentsList = this.post.comments; 
          let likesUser = data[0].likesGroup.find((e :any) => {
            if( e.userId === this.userId) {
              this.btnLikesSelected = true;
            } else {
              this.btnLikesSelected = false;
            }
          
          });

          let dislikesUser = data[0].dislikesGroup.find((e :any) => {
            if( e.userId === this.userId) {
              this.btnDislikesSelected = true;
            } else {
              this.btnDislikesSelected = false;
            }
          });
        }
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    });
  }

  /** Ajouter un commentaire */
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

  /**  Supprimer un commentaire */
  deleteComment(commentId: number){
    this.commentsService.deleteOneComment(commentId).subscribe({
      next: data => {
        if( data ) {
          this.getPost();
        } 
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    })
  }

  addPostLike() {
    if( this.btnLikesSelected !== true ) {
      this.btnLikesSelected = true;
      this.addlikesPosts();

      if( this.btnDislikesSelected) {
        this.removeDislikesPosts();
        this.btnDislikesSelected = false;
      }
    } else {
      this.btnLikesSelected = false;
      this.removeLikesPosts();
    }
  }

  addPostDislike() {
    if( this.btnDislikesSelected !== true ) {
      this.btnDislikesSelected = true;
      this.addDislikesPosts();

      if( this.btnLikesSelected) {
        this.removeLikesPosts();
        this.btnLikesSelected = false ;
      }
    } else {
      this.btnDislikesSelected = false;
      this.removeDislikesPosts();
    }
  }

  /** Ajouter un like API*/
  addlikesPosts() {
    this.likesPostsService.addLikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        if( data ) {
          this.getPost();
        }  
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  /** Supprimer un like API */
  removeLikesPosts() {
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

  /** Ajouter un dislike API */
  addDislikesPosts() {
    this.likesPostsService.addDislikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        if( data ) {
          this.getPost();
        } 
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  /** Supprimer un dislike API */
  removeDislikesPosts() {
    this.likesPostsService.removeDislikesPosts(this.postId, Number(this.userId)).subscribe({
      next: data => {
        if( data ) {
          this.getPost();
        }       
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      } 
    })
  }

  convertDate(dateStr: string): string  {
    return this.helperService.converterToFrenchDate(dateStr);
  }
}
