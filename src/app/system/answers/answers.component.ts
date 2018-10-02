import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService } from '../shared/services/answers.service';
import { Answer } from '../shared/models/answer';
import { AuthService } from '../shared/services/auth.service';
import { Observable, of } from 'rxjs';


@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

    @Input() qid: number;
    answers: Answer[];
    isLogged: Boolean;

    constructor(
        private route: ActivatedRoute,
        private answersService: AnswersService,
        private authService: AuthService
    ) {
    }
    getAnswers() {
        this.answersService.getAnswers(this.qid).subscribe(data => {
            const answers = [];
            this.isLogged = this.authService.isLogged();
            for (const item of Object.values(data)) {
                const answer = new Answer();
                answer.id = item['id'];
                answer.text = item['content']['rendered'];
                answer.authorId = item['author'];
                answer.authorAvatarUrl = item['author_avatar_urls']['96'];
                answer.authorName = item['author_name'];
                answer.date = item['date'];
                answers.push(answer);
            }
            return this.answers = answers;
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
        of(this.authService.isLogged()).subscribe(bool => {
            if (bool) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
            }
        });
    }
}
