import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { map, switchMap } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private meUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/me';
    private usersUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/register';
    private tokenUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/me/token';
    private isLoggedIn = new BehaviorSubject<boolean>(this.isLogged());
    isLoggedIn$ = this.isLoggedIn.asObservable();

    author = new Author();

    constructor(
        private http: HttpClient
    ) {
    }

    getMe(): Observable<Object> {
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
        };
        return this.http.get(this.meUrl, httpOptions);
    }

    getToken(): Observable<string> {
        return this.http.post(this.meUrl + '/login', {
            username: window.localStorage.getItem('username'),
            password: window.localStorage.getItem('password')
        }).pipe(map(data => data['data']['token']));
    }
    auth(): Observable<Object> {
        return this.http.post(this.meUrl + '/login', {
            username: window.localStorage.getItem('username'),
            password: window.localStorage.getItem('password')
        });
    }
    signUp(username, email, password): Observable<Object> {
        return this.http.post(this.usersUrl, {
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
}
