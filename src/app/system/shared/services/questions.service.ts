import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import { Question } from '../models/question';

import * as myGlobals from './global';
import { WpPost } from '../models/wp-post';
import { map } from 'rxjs/operators';
import { Author } from '../models/author';

@Injectable()
export class QuestionsService {
    private questionsUrl = `${myGlobals.href}posts`;
    private questionsEmbedUrl = `${myGlobals.href}posts?&_embed`;

    constructor(
        private http: HttpClient
    ) {}

    getQuestion(id: number): Observable<Question> {
        return this.http.get<WpPost>(`${this.questionsUrl}/${id}`).pipe(map(questionData => {
          const question = new Question();
          question.id = questionData.id;
          question.title = questionData.title.rendered;
          question.text = questionData.content.rendered;
          question.date = questionData.date;
          question.categories = questionData.categories;
          question.author = new Author();
          question.author.id = questionData.author;
          return question;
        }));
    }

    getQuestionsEmbed(): Observable<HttpResponse<WpPost[]>> {
        return this.http.get<WpPost[]>(this.questionsEmbedUrl, {observe: 'response'});
    }
    getQuestionsPage(page): Observable<HttpResponse<WpPost[]>> {
        return this.http.get<WpPost[]>(`${this.questionsEmbedUrl}&page=${page}`, {observe: 'response'});
    }
    addQuestion(title: string, text: string, categories, token): Observable<WpPost> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.post<WpPost>(this.questionsUrl, {
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
