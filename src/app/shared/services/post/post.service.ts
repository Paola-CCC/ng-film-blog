import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategoriesForm, IPosts } from '@shared/interfaces';

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

  //Ok
  getOnePost(id: number): Observable<any> {
    return this.http.get<IPosts>(API + `post-show/${id}`, httpOptions);
  }

  //Ok
  getFrontPost(): Observable<any> {
    return this.http.get<IPosts>(API + `post-front-hero`, httpOptions);
  }

  getFrontListPost(): Observable<any> {
    return this.http.get<IPosts>(API + `posts-front-list`, httpOptions);
  }

  getFrontLatestPost(): Observable<any> {
    return this.http.get<IPosts>(API + `posts-front-latest`, httpOptions);
  }

  //OK
  addNewPost( userId: number, title: string, content :string, thumbnail:string, categoryId: number): Observable<any> {
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
    userId: number,
    postId: number
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

  //OK
  deleteOnePost(id: number): Observable<any> {
    return this.http.delete(API + `post-remove/${id}`, httpOptions);
  }

  uploadImage(data:any ){

    const httpHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    return this.http.post(API + 'image-upload', data , httpHeaders);
  }
}
