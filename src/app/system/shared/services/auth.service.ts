import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorsService } from './authors.service';
import { Author } from '../models/author';
import { map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    author = new Author();

    constructor(
        private http: HttpClient,
        private authorsService: AuthorsService
    ) {
    }

    tryLogin() {
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
        };
        return this.authorsService.getAuthorByUsername(username, httpOptions);
    }

    login() {
        this.isAuthenticated = true;
        window.localStorage.setItem('isLogged', 'true');
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

}
