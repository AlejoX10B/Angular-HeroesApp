import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.authService.verifyAuth()
      .pipe(
        tap( isAuth => {
          if (!isAuth) this.router.navigate(['auth/login'])
        })
      );

    //return !!this.authService.auth.id;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {

    return this.authService.verifyAuth()
      .pipe(
        tap( isAuth => {
          if (!isAuth) this.router.navigate(['auth/login'])
        })
      );

    //return !!this.authService.auth.id;
  }
}
