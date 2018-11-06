import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService } from '../shared/services/answers.service';
import { Answer } from '../shared/models/answer';
import { AuthService } from '../shared/services/auth.service';
import { combineLatest, Observable, of } from 'rxjs';


@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

    @Input() qid: number;
    answers: Answer[] = [];
    isLogged: Boolean;
    pages: number;
    answersCount: number;

    constructor(
        private answersService: AnswersService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {}
    getAnswers() {
        combineLatest(this.route.queryParams, this.route.params).subscribe(([paramsPage, paramsId]) => {
            const page = paramsPage.page;
            const id = paramsId.id;
            this.answersService.getAnswersPage(id, page).subscribe(data => {
                this.answers = [];
                this.isLogged = this.authService.isLogged();
                for (const item of Object.values(data.body)) {
                    const answer = new Answer();
                    answer.id = item['id'];
                    answer.text = item['content']['rendered'];
                    answer.authorId = item['author'];
                    answer.authorAvatarUrl = item['author_avatar_urls']['96'];
                    answer.authorName = item['author_name'];
                    answer.date = item['date'];
                    this.answers.push(answer);
                }
                this.answersCount = data.headers.get('x-wp-total');
                if (this.answersCount && this.answersCount > 10) {
                    this.pages = Math.ceil(this.answersCount / 10);
                } else {
                    this.pages = 0;
                }
                return this.answers;
            });
        });
    }
    add(text: string): void {
        text = text.trim();
        if (!text) {
            return ErrorEmpty();
        }
        this.answersService.addAnswer(text, this.qid)
            .subscribe(answer => {
                this.getAnswers();
            });
        function ErrorEmpty() {
            if (!text) {
                alert('Insert text!');
            }
        }
    }
    ngOnInit() {
        this.getAnswers();
        this.authService.isLoggedIn$.subscribe(isLogged => this.isLogged = isLogged);
    }
}
