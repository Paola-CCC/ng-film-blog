import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getPaginatedData(page: number, itemsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    return this.http.get<any>(API + 'posts-pages', { params });
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

  //OK
  uploadImage(data:any ){

    return this.http.post(API + 'images-upload', data, {
      responseType: 'json',
    });
  };

  showImages(){
    return this.http.get(API + 'images-all', httpOptions);
  };

}
