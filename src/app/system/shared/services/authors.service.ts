import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import * as myGlobals from './global';
import { WpUser } from '../models/wp-user';
import { WpPost } from '../models/wp-post';


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

    getAuthor(id: number): Observable<WpUser> {
        return this.http.get<WpUser>(this.authorsUrl + id);
    }
    getAuthorBySlug(slug): Observable<WpUser> {
        return this.http.get(this.authorsUrl + '?slug=' + slug).pipe(map(data => data[0] ? data[0] : undefined));
    }
    getAuthors(): Observable<WpUser[]> {
        return this.http.get<WpUser[]>(this.authorsUrl);
    }
    getAuthorQuestions(id): Observable<WpPost[]> {
        return this.http.get<WpPost[]>(this.authorPostsUrl + id);
    }
    getAuthorAnswers(id, token): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.commentsUrl + '?author=' + id, {headers: headers});
    }
}
