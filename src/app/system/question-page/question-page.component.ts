import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Question } from '../shared/models/question';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { QuestionsService } from '../shared/services/questions.service';
import { Author } from '../shared/models/author';
import { AuthorsService } from '../shared/services/authors.service';
import { CategoriesService } from '../shared/services/categories.service';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
    question: Question;
    author: Author = new Author();
    isLoaded = false;
    routeId: number;
    error: '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private questionService: QuestionsService,
      private authorsService: AuthorsService,
      private categoriesService: CategoriesService
    ) {}

    getCurrentQuestion() {
      this.routeId = +this.route.snapshot.paramMap.get('id');
      this.questionService.getQuestion(this.routeId).subscribe(questionData => {
        this.question = new Question();
        this.authorsService.getAuthor(questionData.author.id).subscribe(authorData => {
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
      this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.getCurrentQuestion();
        }
      });
    }
}
