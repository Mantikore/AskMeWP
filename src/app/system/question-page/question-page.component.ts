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
    author: Author = new Author();
    isLoaded = false;
    routeId: number;

    constructor(
      private route: ActivatedRoute,
      private questionService: QuestionsService,
      private authorsService: AuthorsService
    ) {}

    ngOnInit(): void {
        this.routeId = +this.route.snapshot.paramMap.get('id');
        this.questionService.getQuestion(this.routeId).subscribe(questionData => {
            this.question = new Question();
            this.authorsService.getAuthor(questionData.author.id).subscribe(authorData => {
              this.author = authorData;
              this.question.author = authorData;
            });
            this.question = questionData;
            this.isLoaded = true;
        });
    }

}
