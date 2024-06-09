import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API = 'http://localhost:8000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  //OK
  getAll(): Observable<any> {
    return this.http.get(API + 'user-all', httpOptions);
  }

  getAllWithDetails(): Observable<any> {
    return this.http.get(API + 'user-all-details', httpOptions);
  }

  //OK
  getById(id : number  | null): Observable<any> {
    return this.http.get(API + `user-show/${id}`, httpOptions);
  }
 
  //OK
  deleteOneUser(id : number): Observable<any> {
    return this.http.delete(API + `user-remove/${id}`, httpOptions);
  }

  //OK
  updateUser(userId : number , username : string , email : string , password : string): Observable<any> {
    return this.http.put(API + 'use-update', {
      userId,
      username,
      email,
      password
    }, httpOptions);
  }

}
