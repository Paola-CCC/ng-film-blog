import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Récupère le token d'authentification depuis le localStorage
    const token = localStorage.getItem('token');
    // Récupère le token d'authentification depuis le Cookie Envoyer par le backend
    const cookie = this.cookieService.get('Token');


    // Cloner la requête et ajouter l'en-tête Authorization avec le token
    if (token || cookie) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token || cookie}`,
          'Content-Type': 'application/json'
        }
      });
    }

    // Envoyer la requête modifiée au prochain intercepteur ou au backend
    return next.handle(request);
  }

}

export const AuthInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];