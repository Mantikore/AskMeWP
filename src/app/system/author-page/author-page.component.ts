import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from '../shared/services/authors.service';
import { Author } from '../shared/models/author';
import { combineLatest } from 'rxjs';
import { Question } from '../shared/models/question';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
    author = new Author;
    questions: Question[];

    constructor(private route: ActivatedRoute,
                private authorService: AuthorsService) {
    }
    getAuthor() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.authorService.getAuthor(id).subscribe( authorData => {
            const author = new Author();
            author.id = authorData.id;
            author.name = authorData.name;
            author.avatarUrl = authorData.avatar_urls['96'];
            return this.author = author;
        });
        this.authorService.getAuthorQuestions(id).subscribe(questionsData => {
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
    }
  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
          this.getAuthor();
          console.log(this.questions);
      });
  }
}
