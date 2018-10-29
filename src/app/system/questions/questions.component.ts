import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question';
import { Author } from '../shared/models/author';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category';
import { AnswersService } from '../shared/services/answers.service';

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

    constructor(
        private questionsService: QuestionsService,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private answersService: AnswersService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
            const page = params.page;
            const id = params.id;
                if (id) {
                    this.categoriesService.getCategory(id).subscribe(data => this.getCategoryFromData(data));
                    this.categoriesService.getQuestionsByCategory(id).subscribe(data => this.getQuestionsFromData(data));
                } else if (page) {
                    this.questionsService.getQuestionsPage(page).subscribe(data => this.getQuestionsFromData(data));
                } else {
                    this.questionsService.getQuestionsEmbed().subscribe(data => this.getQuestionsFromData(data));
                }
            }
        );

    }
    pluralizeAnswers(num) {
        return num === 1 ? 'answer' : 'answers';
    }
    getQuestionsFromData(data) {
        this.questions = [];
        for (const item of Object.values(data.body)) {
            const question = new Question();
            const author = new Author();
            question.id = item['id'];
            question.title = item['title'].rendered;
            question.text = item['content'].rendered;
            question.answers = 0;
            this.answersService.getAnswersCount(question.id).subscribe(count => question.answers = +count.headers.get('x-wp-total'));
            question.date = item['date'];
            author.id = item['author'];
            author.name = item['_embedded'].author[0].name;
            author.avatarUrl = item['_embedded'].author[0].avatar_urls['96'];
            question.author = author;
            this.questions.push(question);
        }
        this.questionsCount = data.headers.get('x-wp-total');
        if (this.questionsCount && this.questionsCount > 10) {
            this.pages = Math.ceil(this.questionsCount / 10);
        } else {
            this.pages = 0;
        }
        return this.questions;
    }
    getCategoryFromData(data) {
        this.category = new Category;
        this.category.name = data.name;
        this.category.slug = data.slug;
        this.category.id = data.id;
        return this.category;
    }
}

