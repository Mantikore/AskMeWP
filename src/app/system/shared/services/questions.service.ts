import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import { AuthService } from './auth.service';
import { Question } from '../models/question';

import * as myGlobals from './global';

@Injectable()
export class QuestionsService {
    private questionsUrl = `${myGlobals.href}posts`;
    private questionsEmbedUrl = `${myGlobals.href}posts?&_embed`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getQuestion(id: number): Observable<any> {
        return this.http.get(`${this.questionsUrl}/${id}`);
    }

    getQuestionsEmbed(): Observable<any> {
        return this.http.get(this.questionsEmbedUrl, {observe: 'response'});
    }
    getQuestionsPage(page): Observable<any> {
        return this.http.get(`${this.questionsEmbedUrl}&page=${page}`, {observe: 'response'});
    }
    addQuestion(title: string, text: string, categories, token) {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(this.questionsUrl, {
            slug: window.localStorage.getItem('username'),
            title: title,
            content: text,
            date: new Date(),
            status: 'publish',
            categories: categories
        }, { headers: headers });
    }
    searchQuestions(term: string): Observable<Question[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Question[]>(`${this.questionsUrl}?search=${term}`);
    }
}
