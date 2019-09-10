import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService } from '../shared/services/answers.service';
import { Answer } from '../shared/models/answer';
import { AuthService } from '../shared/services/auth.service';
import { combineLatest, Observable, of } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PaginationService } from '../shared/services/pagination.service';


@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

    @Input() qid: number;
    answers: Answer[];
    isLogged: Boolean;
    isLoaded = false;
    pages: number;
    htmlContent: string;
    error = '';

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        uploadUrl: 'v1/images',
    };

    constructor(
        private answersService: AnswersService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private paginationService: PaginationService
    ) {}
    getAnswers(): void {
        combineLatest(this.route.queryParams, this.route.params).subscribe(([paramsPage, paramsId]) => {
            const page = paramsPage.page;
            const id = paramsId.id;
            this.answersService.getAnswersPage(id, page).subscribe(data => {
                this.answers = [];
                this.isLogged = this.authService.isLogged();
                data.body.map(item => {
                  const answer = new Answer();
                  answer.id = item['id'];
                  answer.text = item['content']['rendered'];
                  answer.authorId = item['author'];
                  answer.authorAvatarUrl = item['author_avatar_urls']['96'];
                  answer.authorName = item['author_name'];
                  answer.date = item['date'];
                  this.answers.push(answer);
                });
                this.pages = this.paginationService.getPagesCount(data);
                this.isLoaded = true;
            },
              err => this.error = err.statusText);
        },
          err => this.error = err.statusText);
    }
    addAnswer(text: string): void {
        text = text.trim();
        if (!text) {
            return ErrorEmpty();
        }
        this.answersService.addAnswer(text, this.qid, window.localStorage.getItem('token'))
            .subscribe(answer => {
                this.getAnswers();
            },
              err => this.error = err.statusText);
        function ErrorEmpty(): void {
            if (!text) {
                alert('Insert text!');
            }
        }
    }
    ngOnInit() {
        this.getAnswers();
        this.authService.isLoggedIn$.subscribe(isLogged => this.isLogged = isLogged, err => this.error = err.statusText);
    }
}
