import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from '../shared/services/authors.service';
import { Author } from '../shared/models/author';
import { Question } from '../shared/models/question';
import { takeUntil } from 'rxjs/operators';
import {Subject} from "rxjs";

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit, OnDestroy {
  author: Author;
  questions: Question[];
  isLoaded = false;
  pages: number;
  error: '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService
  ) {}

  getAuthor(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.authorService.getAuthorBySlug(slug)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(authorData => {
        this.author = authorData;
        this.authorService.getAuthorQuestions(this.author.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(questionsData => {
            this.questions = questionsData;
            this.isLoaded = true;
          },
            err => this.error = err.statusText);
      },
      err => this.error = err.statusText);
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: Params) => {
      this.getAuthor();
    },
      err => this.error = err.statusText);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
