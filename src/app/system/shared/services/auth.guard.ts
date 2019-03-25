
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        this.authService.isLoggedIn$.subscribe(isLogged => {
            if (!isLogged) {
                this.router.navigate(['system/questions']);
            }
        });
        return this.authService.isLoggedIn$;
    }
}
