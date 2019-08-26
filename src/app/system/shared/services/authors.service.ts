import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import * as myGlobals from './global';
import { WpUser } from '../models/wp-user';
import { WpPost } from '../models/wp-post';
import { Author } from '../models/author';
import { Question } from '../models/question';


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

    getAuthor(id: number): Observable<Author> {
        return this.http.get<WpUser>(this.authorsUrl + id).pipe(map(authorData => {
            const author = new Author();
            author.name = authorData.name;
            author.avatarUrl = authorData.avatar_urls['96'];
            author.slug = authorData.slug;
            return author;
        }));
    }
    getAuthorBySlug(slug): Observable<Author> {
        return this.http.get<WpUser>(this.authorsUrl + '?slug=' + slug).pipe(
            map(data => data[0] ? data[0] : undefined),
            map(authorData => {
              const author = new Author();
              author.id = authorData.id;
              author.name = authorData.name;
              author.avatarUrl = authorData.avatar_urls['96'];
              author.slug = authorData.slug;
              return author;
            }));
    }
    getAuthors(): Observable<Author[]> {
        return this.http.get<WpUser[]>(this.authorsUrl).pipe(map(authorData => {
            return authorData.map( user => {
              const author = new Author;
              author.id = user['id'];
              author.name = user['name'];
              author.avatarUrl = user['avatar_urls']['96'];
              author.slug = user['slug'];
              return author;
            });
        }));
    }
    getAuthorQuestions(id): Observable<Question[]> {
        return this.http.get<WpPost[]>(this.authorPostsUrl + id).pipe(map(questionsData => {
          const questions: Question[] = [];
          questionsData.map(item => {
            const question = new Question();
            question.id = item['id'];
            question.title = item['title'].rendered;
            question.text = item['content'].rendered;
            question.date = item['date'];
            questions.push(question);
          });
          return questions;
        }));
    }
    getAuthorAnswers(id, token): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.commentsUrl + '?author=' + id, {headers: headers});
    }
}
