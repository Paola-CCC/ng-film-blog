import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '@shared/services';
import { Observable } from 'rxjs';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree=> {

  return inject(TokenStorageService).isLoggedIn
    ? true
    : inject(Router).createUrlTree(['/user/register']);

};