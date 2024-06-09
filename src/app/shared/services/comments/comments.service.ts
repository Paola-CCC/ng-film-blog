import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComments } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API = 'http://localhost:8000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  //OK
  getAll(): Observable<any> {
    return this.http.get<IComments>(API + 'comment-all', httpOptions);
  }
  //OK
  getOneComment(id : any): Observable<any> {
    return this.http.get<IComments>(API + `comment-show/${id}`, httpOptions);
  }
 
  //OK
  deleteOneComment(id : any): Observable<any> {
    return this.http.delete(API + `comment-remove/${id}`, httpOptions);
  }

  //OK
  addNewComment( content: string, userId : number |null , postId : number): Observable<any> {
    return this.http.post(API + 'comment-new', {
      content,
      userId,
      postId
    }, httpOptions);
  }

  //OK
  updateComment(comment_text : any , userId : any , postId : any , commentId : any): Observable<any> {
    return this.http.put(API + 'comment-update', {
      comment_text,
      userId,
      postId,
      commentId
    }, httpOptions);
  }
}
