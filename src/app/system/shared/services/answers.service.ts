import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import * as myGlobals from './global';
import { WpComment } from '../models/wp-comment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
    private answersUrl = `${myGlobals.href}comments?order=asc&&post=`;
    private allAnswersUrl = `${myGlobals.href}comments`;

    constructor(
        private http: HttpClient,
    ) {}
    getAnswersCount(id: number): Observable<HttpResponse<WpComment[]>> {
        return this.http.get<WpComment[]>(this.answersUrl + id, {observe: 'response'});
    }
    getAnswersPage(id: number, page: number): Observable<HttpResponse<WpComment[]>> {
        return this.http.get<WpComment[]>(`${this.answersUrl}${id}&page=${page ? page : 1}`, {observe: 'response'});
    }
    addAnswer(text: string, qid: number, token: string): Observable<WpComment> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.post<WpComment>(this.allAnswersUrl, {
            slug: window.localStorage.getItem('username'),
            content: text,
            date: new Date(),
            post: qid
        }, { headers: headers });
    }
}
