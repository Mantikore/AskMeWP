import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author';
import { BehaviorSubject, Observable } from 'rxjs/index';
import * as myGlobals from './global';
import { WpUser } from '../models/wp-user';
import { AuthorsService } from './authors.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private meUrl = `${myGlobals.href}users/me`;
    private usersUrl = `${myGlobals.href}users/register`;
    private tokenUrl = `${myGlobals.hrefBase}jwt-auth/v1/token`;
    private isLoggedIn = new BehaviorSubject<boolean>(this.isLogged());
    isLoggedIn$ = this.isLoggedIn.asObservable();

    author = new Author();

    constructor(
        private http: HttpClient,
        private authorsService: AuthorsService
    ) {}

    getMe(): Observable<WpUser> {
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
        };
        return this.http.get<WpUser>(this.meUrl, httpOptions);
    }

    getToken(): Observable<Object> {
        return this.http.post(this.tokenUrl, {
            username: window.localStorage.getItem('username'),
            password: window.localStorage.getItem('password')
        });
    }
    auth(): Observable<Object> {
        return this.http.post(this.meUrl + '/login', {
            username: window.localStorage.getItem('username'),
            password: window.localStorage.getItem('password')
        });
    }
    jwtAuth(username, password): Observable<Object> {
        return this.http.post(this.tokenUrl, {
          username: username,
          password: password
        });
    }
    signUp(username, email, password): Observable<WpUser> {
        return this.http.post<WpUser>(this.usersUrl, {
            username: username,
            email: email,
            password: password
        });
    }

    login(): void {
        window.localStorage.setItem('isLogged', 'true');
        this.isLoggedIn.next(true);
    }

    logout(): void {
        window.localStorage.clear();
        this.isLoggedIn.next(false);
    }

    isLogged(): boolean {
        if (window.localStorage.getItem('isLogged')) {
            return true;
        } else {
            return false;
        }
    }
    showMe() {
        const username = window.localStorage.getItem('username');
        return this.authorsService.getAuthorBySlug(username);
    }
}
