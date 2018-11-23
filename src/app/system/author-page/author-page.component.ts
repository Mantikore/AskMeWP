import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from '../shared/services/authors.service';
import { Author } from '../shared/models/author';
import { Question } from '../shared/models/question';
import { Answer } from '../shared/models/answer';
import { AuthService } from '../shared/services/auth.service';
import { flatMap } from 'tslint/lib/utils';
import { mergeMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
    author = new Author;
    questions: Question[] = [];
    answers: Answer[] = [];
    token: string;

    constructor(private route: ActivatedRoute,
                private authorService: AuthorsService,
                private authService: AuthService) {
    }
    getAuthor() {
        const slug = this.route.snapshot.paramMap.get('slug');
        this.authorService.getAuthorBySlug(slug).subscribe( authorData => {
            const author = new Author();
            author.id = authorData.id;
            author.name = authorData.name;
            author.avatarUrl = authorData.avatar_urls['96'];
            author.slug = authorData.slug;
            this.author = author;

            this.authorService.getAuthorQuestions(this.author.id).subscribe(questionsData => {
                const questions: Question[] = [];
                for (const item of Object.values(questionsData)) {
                    const question = new Question();
                    question.id = item['id'];
                    question.title = item['title'].rendered;
                    question.text = item['content'].rendered;
                    question.date = item['date'];
                    questions.push(question);
                }
                return this.questions = questions;
            });

            // this.authService.getToken()
            //                 .pipe(mergeMap(newToken => {
            //                     console.log(newToken);
            //                     return this.authorService.getAuthorAnswers(author.id, newToken);
            //                 }))
            //                 .subscribe(dataAnswers => {
            //                    console.log(dataAnswers);
            //                 });
        });
    }
  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
          this.getAuthor();
      });
  }
}
