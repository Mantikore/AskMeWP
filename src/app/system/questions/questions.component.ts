import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { Question } from '../shared/models/question';
import { AnswersService } from '../shared/services/answers.service';
import { Author } from '../shared/models/author';
import { AuthorsService } from '../shared/services/authors.service';
import { combineLatest } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    questions: Question[];

    constructor(private questionsService: QuestionsService) {
    }

    ngOnInit() {
        this.questionsService.getQuestionsEmbed().subscribe(data => {
            const questions = [];
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
                questions.push(question);
            }
            return this.questions = questions;
        });

        // this.questionsService.getQuestions().pipe(map(
        //     data => {
        //         let questions = [];
        //         for (const item of Object.values(data)) {
        //             const question = new Question();
        //             const author = new Author();
        //             const answersObs = this.answersService.getAnswers(item['id']);
        //             const authorObs = this.authorsService.getAuthor(item['author']);
        //             combineLatest(answersObs, authorObs).subscribe(([answersData, authorData]) => {
        //                 question.id = item['id'];
        //                 question.title = item['title']['rendered'];
        //                 question.text = item['content']['rendered'];
        //                 question.answers = answersData.length;
        //                 question.date = item['date'];
        //                 author.id = item['author'];
        //                 author.name = authorData.name;
        //                 author.avatarUrl = authorData.avatar_urls['96'];
        //                 question.author = author;
        //                 questions.push(question);
        //             });
        //         }
        //         return questions;
        //     })).subscribe(questions => this.questions = questions);

        // this.questionsService.getQuestions().subscribe(data => {
        //   const questions = [];
        //   for (const item of Object.values(data)) {
        //     const question = new Question();
        //     const author = new Author();
        //     const answersObs = this.answersService.getAnswers(item['id']);
        //     const authorObs = this.authorsService.getAuthor(item['author']);
        //     combineLatest(answersObs, authorObs).subscribe(([answersData, authorData]) => {
        //         question.id = item['id'];
        //         question.title = item['title']['rendered'];
        //         question.text = item['content']['rendered'];
        //         question.answers = answersData.length;
        //         question.date = item['date'];
        //         author.id = item['author'];
        //         author.name = authorData.name;
        //         author.avatarUrl = authorData.avatar_urls['96'];
        //         question.author = author;
        //         questions.push(question);
        //     });
        //   }
        //
        //   return this.questions = questions;
        // });

    }
    pluralizeAnswers(num) {
        return num === 1 ? 'answer' : 'answers';
    }

}

