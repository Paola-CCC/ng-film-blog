import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@interfaces';

const API = 'http://localhost:8000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string ): Observable<any> {
    return this.http.post<IUser>(API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<IUser>(API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }

  logOut(){
    if(localStorage.getItem('user')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  get userDatasStored() {
    const authToken = localStorage.getItem('user');
    return authToken !== null ? JSON.parse(authToken) : '';
  }

  get userIsLogged() {
    const authToken = localStorage.getItem('user');
    return authToken ? true : false;
  }
}