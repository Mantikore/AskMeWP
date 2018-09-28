import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { AuthorsService } from './authors.service';


@Injectable({
  providedIn: 'root'
})
export class AnswersService {
    private answersUrl = 'http://localhost/angularwp/wp-json/wp/v2/comments?post=';
    private allAnswersUrl = 'http://localhost/angularwp/wp-json/wp/v2/comments';

    constructor(
        private http: HttpClient,
        private authorsService: AuthorsService
    ) {}

    getAnswers(id: number): Observable<any> {
        const url = `${this.answersUrl}${id}`;
        const options = { params: new HttpParams().set('order', 'asc') }
        return this.http.get(url, options);
    }
    addAnswer (text: string, qid: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( window.localStorage.getItem('username') + ':' + window.localStorage.getItem('password') ) })
        };
        return this.http.post(this.allAnswersUrl, {
            slug: window.localStorage.getItem('username'),
            content: text,
            date: new Date(),
            post: qid
        }, httpOptions);
    }

}
