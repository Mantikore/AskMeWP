import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from '../shared/services/authors.service';
import { Author } from '../shared/models/author';
import { Question } from '../shared/models/question';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
  author: Author;
  questions: Question[];
  isLoaded = false;
  pages: number;
  error: '';

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService
  ) {}

  getAuthor(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.authorService.getAuthorBySlug(slug).subscribe(authorData => {
      this.author = authorData;
      this.authorService.getAuthorQuestions(this.author.id).subscribe(questionsData => {
        this.questions = questionsData;
        this.isLoaded = true;
      },
        err => this.error = err.statusText);
    },
      err => this.error = err.statusText);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.getAuthor();
    },
      err => this.error = err.statusText);
  }
}
