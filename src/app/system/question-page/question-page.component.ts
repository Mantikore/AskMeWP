import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { Question } from '../shared/models/question';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { QuestionsService } from '../shared/services/questions.service';
import { Author } from '../shared/models/author';
import { AuthorsService } from '../shared/services/authors.service';
import { CategoriesService } from '../shared/services/categories.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit, OnDestroy {
    question: Question;
    author: Author = new Author();
    isLoaded = false;
    routeId: number;
    error: '';
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private questionService: QuestionsService,
      private authorsService: AuthorsService
    ) {}

    getCurrentQuestion() {
      this.routeId = +this.route.snapshot.paramMap.get('id');
      this.questionService.getQuestion(this.routeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(questionData => {
        this.question = new Question();
        this.authorsService.getAuthor(questionData.author.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(authorData => {
          this.author = authorData;
          this.question.author = authorData;
        },
          err => this.error = err.statusText);
        this.question = questionData;
        this.isLoaded = true;
      },
        err => this.error = err.statusText);
    }
    ngOnInit(): void {
      this.getCurrentQuestion();
      this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.getCurrentQuestion();
        }
      });
    }
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}
