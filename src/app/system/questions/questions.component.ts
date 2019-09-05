import { AfterViewInit, Component, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question';
import { Author } from '../shared/models/author';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category';
import { AnswersService } from '../shared/services/answers.service';
import { combineLatest, merge } from 'rxjs/index';
import { PaginationService } from '../shared/services/pagination.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    questions: Question[];
    category: Category;
    questionsCount: number;
    pages: number;
    isLoaded = false;

    constructor(
        private questionsService: QuestionsService,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private answersService: AnswersService,
        private paginationService: PaginationService
    ) {}

    ngOnInit() {
        combineLatest(this.route.queryParams, this.route.params).subscribe(([paramsPage, paramsId]) => {
            const page = paramsPage.page;
            const id = paramsId.id;
            if (id) {
                this.categoriesService.getCategory(id).subscribe(cat => { this.category = cat; });
                this.categoriesService.getQuestionsByCategory(id).subscribe(this.getQuestionsFromData);
            } else if (page) {
                this.questionsService.getQuestionsPage(page).subscribe(this.getQuestionsFromData);
            } else {
                this.questionsService.getQuestionsEmbed().subscribe(this.getQuestionsFromData);
            }
        });
    }
    pluralizeAnswers(num): string {
        return num === 1 ? 'answer' : 'answers';
    }
    getQuestionsFromData = (data): void => {
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
          this.answersService.getAnswersCount(question.id).subscribe(count => question.answers = +count.headers.get('x-wp-total'));
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
}

