import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorsService } from './authors.service';
import { Author } from '../models/author';
import { map } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private meUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/me';
    author = new Author();

    constructor(
        private http: HttpClient,
        private authorsService: AuthorsService
    ) {
    }

    // tryLogin() {
    //     const username = window.localStorage.getItem('username');
    //     const password = window.localStorage.getItem('password');
    //     const httpOptions = {
    //         headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
    //     };
    //     return this.authorsService.getAuthorByUsername(username, httpOptions);
    // }
    getMe() {
        const username = window.localStorage.getItem('username');
        const password = window.localStorage.getItem('password');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( username + ':' + password ) })
        };
        return this.http.get(this.meUrl, httpOptions);
    }

    login() {
        window.localStorage.setItem('isLogged', 'true');
    }

    logout() {
        window.localStorage.clear();
    }

    isLogged(): boolean {
        if (window.localStorage.getItem('isLogged')) {
            return true;
        } else {
            return false;
        }
    }

}
