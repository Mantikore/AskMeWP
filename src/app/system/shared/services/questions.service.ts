import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Router } from '@angular/router';



@Injectable()
export class QuestionsService {
    private questionsUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts';
    private questionsEmbedUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts?&_embed';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getQuestions(): Observable<any> {
        return this.http.get(this.questionsUrl);
    }

    getQuestion(id: number): Observable<any> {
        return this.http.get(`${this.questionsUrl}/${id}`);
    }

    getQuestionsEmbed(): Observable<any> {
        return this.http.get(this.questionsEmbedUrl);
    }
    addQuestion(title: string, text: string) {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization' : 'Basic ' + btoa( window.localStorage.getItem('username') + ':' + window.localStorage.getItem('password') ) })
        };
        return this.http.post(this.questionsUrl, {
            slug: window.localStorage.getItem('username'),
            title: title,
            content: text,
            date: new Date(),
            status: 'publish'
        }, httpOptions);
    }

}
