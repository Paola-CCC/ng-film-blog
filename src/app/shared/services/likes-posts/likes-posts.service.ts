import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


const API: string= environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LikesPostsService {

constructor(private http: HttpClient) { }

  addLikesPosts(postId: number, userId: number): Observable<any> {
    return this.http.post(API + 'likes-posts-new',
      {
        postId,
        userId
      },
      httpOptions
    );
  }

  removeLikesPosts(postId: number, userId: number): Observable<any> {
    const options = {
      body: {
        postId,
        userId
      }
    };
  
    return this.http.delete(API + 'likes-posts-remove', options);
  }


  addDislikesPosts(postId: number, userId: number): Observable<any> {
    
    return this.http.post( API + 'dislikes-posts-new',
      {
        postId,
        userId
      },
      httpOptions
    );
  }

  removeDislikesPosts(postId: number, userId: number): Observable<any> {

    const options = {
      body: {
        postId,
        userId
      }
    };

    return this.http.delete( API + 'dislikes-posts-remove', options );
  }

}
