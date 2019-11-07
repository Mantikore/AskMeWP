import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question';
import { Author } from '../shared/models/author';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category';
import { AnswersService } from '../shared/services/answers.service';
import { combineLatest, Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/operators';
import { PaginationService } from '../shared/services/pagination.service';
import { HttpResponse } from '@angular/common/http';
import { WpPost } from '../shared/models/wp-post';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

    questions: Question[];
    category: Category;
    questionsCount: number;
    pages: number;
    isLoaded = false;
    error = '';
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private questionsService: QuestionsService,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private answersService: AnswersService,
        private paginationService: PaginationService
    ) {}

    ngOnInit() {
        combineLatest(this.route.queryParams, this.route.params).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([paramsPage, paramsId]) => {
            const page = paramsPage.page;
            const id = paramsId.id;
            if (id) {
                this.categoriesService.getCategory(id)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(cat => this.category = cat, this.getError);
                this.categoriesService.getQuestionsByCategory(id)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(this.getQuestionsFromData, this.getError);
            } else if (page) {
                this.questionsService.getQuestionsPage(page)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(this.getQuestionsFromData, this.getError);
            } else {
                this.questionsService.getQuestionsEmbed()
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(this.getQuestionsFromData, this.getError);
            }
        }, this.getError);
    }
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
    pluralizeAnswers(num): string {
        return num === 1 ? 'answer' : 'answers';
    }
    getQuestionsFromData = (data: HttpResponse<WpPost[]>): void => {
        this.questions = [];
        this.questionsCount = data.body.length;
        data.body.map( item => {
          const question = new Question();
          const author = new Author();
          question.id = item['id'];
          question.title = item.title.rendered;
          question.text = item.content.rendered;
          question.answers = 0;
          question.date = item.date;
          question.categories = item.categories;
          this.answersService.getAnswersCount(question.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(count => question.answers = +count.headers.get('x-wp-total'));
          author.id = item.author;
          author.name = item._embedded.author[0].name;
          author.avatarUrl = item._embedded.author[0].avatar_urls['96'];
          author.slug = item._embedded.author[0].slug;
          question.author = author;
          this.questions.push(question);
        });
        this.pages = this.paginationService.getPagesCount(data);
        this.isLoaded = true;
    }
    getError = err => {
      this.error = err.statusText;
      this.isLoaded = true;
    }
}

