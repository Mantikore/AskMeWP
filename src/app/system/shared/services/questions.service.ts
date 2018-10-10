import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/index';



@Injectable()
export class QuestionsService {
    private questionsUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts';
    private questionsEmbedUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts?&_embed';
    private categoriesUrl = 'http://localhost/angularwp/wp-json/wp/v2/categories';

    constructor(
        private http: HttpClient
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

    getQuestionCategories(id: number): Observable<any> {
        return this.http.get(`${this.categoriesUrl}?post=${id}`);
    }
}
