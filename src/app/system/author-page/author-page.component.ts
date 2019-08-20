import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from '../shared/services/authors.service';
import { Author } from '../shared/models/author';
import { Question } from '../shared/models/question';
import { Answer } from '../shared/models/answer';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
  author: Author;
  questions: Question[];
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService
  ) {}

  getAuthor(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.authorService.getAuthorBySlug(slug).subscribe(authorData => {
      this.author = new Author();
      this.author.id = authorData.id;
      this.author.name = authorData.name;
      this.author.avatarUrl = authorData.avatar_urls['96'];
      this.author.slug = authorData.slug;
      this.authorService.getAuthorQuestions(this.author.id).subscribe(questionsData => {
        this.questions = [];
        for (const item of Object.values(questionsData)) {
          const question = new Question();
          question.id = item['id'];
          question.title = item['title'].rendered;
          question.text = item['content'].rendered;
          question.date = item['date'];
          this.questions.push(question);
        }
        this.isLoaded = true;
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.getAuthor();
    });
  }
}
