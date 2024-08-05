import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategories, ICategoriesForm, IPosts } from '@shared/interfaces';


const API: string = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  //OK
  getAll(): Observable<any> {
    return this.http.get<IPosts[]>(API + 'posts-all', httpOptions);
  }

  //OK
  getAllCategories(): Observable<ICategoriesForm[]> {
    return this.http.get<ICategoriesForm[]>(API + 'categories-all', httpOptions);
  }
  
  //OK
  getOnePost(id: any): Observable<any> {
    return this.http.get(API + `post-show/${id}`, httpOptions);
  }
  //OK
  deleteOnePost(id: any): Observable<any> {
    return this.http.delete(API + `post-remove/${id}`, httpOptions);
  }

  //OK
  addNewPost( userId: number,title: any, content, thumbnail, categoryId): Observable<any> {
    return this.http.post(
      API + 'post-new',
      {
        userId,
        title,
        content,
        thumbnail,
        categoryId
      },
      httpOptions
    );
  }

  //OK
  updatePost(
    title: string,
    content: string,
    userId: any,
    postId: any
  ): Observable<any> {
    return this.http.put(
      API + 'postUpdate',
      {
        title,
        content,
        userId,
        postId
      },
      httpOptions
    );
  }
}
