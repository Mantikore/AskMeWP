import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService } from '../shared/services/answers.service';
import { Answer } from '../shared/models/answer';


@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

    @Input() qid: number;
    answers: Answer[];

    constructor(private route: ActivatedRoute, private answersService: AnswersService) {
    }
    getAnswers() {
        this.answersService.getAnswers(this.qid).subscribe(data => {
            const answers = [];
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
    }
}
