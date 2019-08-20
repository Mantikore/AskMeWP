import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/models/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../shared/services/questions.service';
import { Author } from '../shared/models/author';
import { AuthorsService } from '../shared/services/authors.service';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
    question: Question;
    author: Author;
    isLoaded = false;
    routeId: number;

    constructor(
      private route: ActivatedRoute,
      private questionService: QuestionsService,
      private authorService: AuthorsService
    ) {}

    getQuestion(questionData): void {
        this.question = new Question();
        this.author = new Author();
        this.question.id = questionData.id;
        this.question.title = questionData.title.rendered;
        this.question.text = questionData.content.rendered;
        this.question.date = questionData.date;
        this.author.id = questionData.author;
        this.authorService.getAuthor(this.author.id).subscribe(authorData => {
          this.author.name = authorData.name;
          this.author.avatarUrl = authorData.avatar_urls['96'];
          this.author.slug = authorData.slug;
        });
        this.isLoaded = true;
    }

    ngOnInit(): void {
        this.routeId = +this.route.snapshot.paramMap.get('id');
        this.questionService.getQuestion(this.routeId).subscribe(questionData => {
            return this.getQuestion(questionData);
        });
    }

}
