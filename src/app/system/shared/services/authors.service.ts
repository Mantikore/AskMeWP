import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
    private authorsUrl = 'http://localhost/angularwp/wp-json/wp/v2/users/';
    private authorPostsUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts?author=';

    constructor(
        private http: HttpClient
    ) {}

    getAuthor(id: number): Observable<any> {
        return this.http.get(this.authorsUrl + id);
    }
    getAuthors(): Observable<any> {
        return this.http.get(this.authorsUrl);
    }
    getAuthorQuestions(id): Observable<any> {
        return this.http.get(this.authorPostsUrl + id);
    }

    getAuthorByUsername(username, httpOptions) {
        return this.http.get(this.authorsUrl + '?slug=' + username, httpOptions).pipe(map(data => data[0] ? data[0] : undefined));
    }

    getMe() {
        return this.http.get(this.authorsUrl + 'me');
    }
}
