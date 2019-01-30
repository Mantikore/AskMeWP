import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs/index';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Question } from '../models/question';
import { tap } from 'rxjs/internal/operators';



@Injectable()
export class QuestionsService {
    private questionsUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts';
    private questionsEmbedUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts?&_embed';

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
