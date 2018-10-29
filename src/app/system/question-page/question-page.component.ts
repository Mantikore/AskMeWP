import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../shared/models/question';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionsService } from '../shared/services/questions.service';
import { Author } from '../shared/models/author';
import { AuthorsService } from '../shared/services/authors.service';
import { combineLatest } from 'rxjs/index';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
    question: Question;
    author: Author;
    answerPages: number;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionsService,
                private authorService: AuthorsService) {
    }
    getQuestion(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.questionService.getQuestion(id).subscribe(questionData => {
            const question = new Question();
            const author = new Author();
            question.id = questionData.id;
            question.title = questionData.title.rendered;
            question.text = questionData.content.rendered;
            question.date = questionData.date;
            author.id = questionData.author;
            this.authorService.getAuthor(author.id).subscribe(authorData => {
                author.name = authorData.name;
                author.avatarUrl = authorData.avatar_urls['96'];
            });
            this.author = author;
            return this.question = question;
        });

    }

    ngOnInit(): void {
       this.getQuestion();
    }
}
