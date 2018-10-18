import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question';
import { Author } from '../shared/models/author';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    questions: Question[];
    category: Category;

    constructor(
        private questionsService: QuestionsService,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
            const id = params.id;
                if (id) {
                    this.categoriesService.getCategory(id).subscribe(data => {
                        this.getCategoryFromFata(data);
                    });
                    this.categoriesService.getQuestionsByCategory(id).subscribe(data => this.getQuestionsFromData(data));
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
        for (const item of Object.values(data)) {
            const question = new Question();
            const author = new Author();
            question.id = item['id'];
            question.title = item['title'].rendered;
            question.text = item['excerpt'].rendered;
            question.answers = 0;
            if (item['_embedded'].replies) {
                question.answers = item['_embedded'].replies[0].length;
            }
            question.date = item['date'];
            author.id = item['author'];
            author.name = item['_embedded'].author[0].name;
            author.avatarUrl = item['_embedded'].author[0].avatar_urls['96'];
            question.author = author;
            this.questions.push(question);
        }
        return this.questions;
    }
    getCategoryFromFata(data) {
        this.category = new Category;
        this.category.name = data.name;
        this.category.slug = data.slug;
        this.category.id = data.id;
        return this.category;
    }
}

