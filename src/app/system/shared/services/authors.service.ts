import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import * as myGlobals from './global';


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
    private authorsUrl = `${myGlobals.href}users/`;
    private authorPostsUrl = `${myGlobals.href}posts?author=`;
    private commentsUrl = `${myGlobals.href}comments`;

    constructor(
        private http: HttpClient
    ) {}

    getAuthor(id: number): Observable<any> {
        return this.http.get(this.authorsUrl + id);
    }
    getAuthorBySlug(slug): Observable<any> {
        return this.http.get(this.authorsUrl + '?slug=' + slug).pipe(map(data => data[0] ? data[0] : undefined));
    }
    getAuthors(): Observable<any> {
        return this.http.get(this.authorsUrl);
    }
    getAuthorQuestions(id): Observable<any> {
        return this.http.get(this.authorPostsUrl + id);
    }
    getAuthorAnswers(id, token): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.commentsUrl + '?author=' + id, {headers: headers});
    }
    getMe() {
        return this.http.get(this.authorsUrl + 'me');
    }
}
