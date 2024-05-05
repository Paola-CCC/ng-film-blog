import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:8000/';

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
    return this.http.get(API + 'userAll', httpOptions);
  }

  getAllWithDetails(): Observable<any> {
    return this.http.get(API + 'userAllDetails', httpOptions);
  }

  //OK
  getOneUser(id : number): Observable<any> {
    return this.http.get(API + `userShow/${id}`, httpOptions);
  }
 
  //OK
  deleteOneUser(id : number): Observable<any> {
    return this.http.delete(API + `userRemove/${id}`, httpOptions);
  }

  //OK
  updateUser(userId : number , username : string , email : string , password : string): Observable<any> {
    return this.http.put(API + 'userUpdate', {
      userId,
      username,
      email,
      password
    }, httpOptions);
  }

}
