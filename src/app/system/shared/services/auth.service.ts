import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/author';
import { BehaviorSubject, Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private meUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/me';
    private isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedIn.asObservable();

    author = new Author();

    constructor(
        private http: HttpClient
    ) {
    }

    getMe(): Observable<any> {
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
        };
        return this.http.get(this.meUrl, httpOptions);
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
