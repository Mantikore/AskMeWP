import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { AuthorsService } from './authors.service';
import { switchMap } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AnswersService {
    private answersUrl = 'http://localhost/angularwp/wp-json/wp/v2/comments?post=';
    private allAnswersUrl = 'http://localhost/angularwp/wp-json/wp/v2/comments';

    constructor(
        private http: HttpClient,
    ) {}
    getAnswersCount(id: number): Observable<any> {
        return this.http.get(this.answersUrl + id, {observe: 'response'});
    }
    getAnswersPage(id: number, page: number): Observable<any> {
        return this.http.get(`${this.answersUrl}${id}&page=${page ? page : 1}`, {observe: 'response'});
    }
    addAnswer (text: string, qid: number, token: string): Observable<Object> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(this.allAnswersUrl, {
            slug: window.localStorage.getItem('username'),
            content: text,
            date: new Date(),
            post: qid
        }, { headers: headers });
    }

}
