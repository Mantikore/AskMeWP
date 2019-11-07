import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/internal/operators';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../models/question';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    private searchTerms = new Subject<string>();
    foundedQuestions: Question[] = [];
    nothingFound: Boolean = false;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
      this.searchTerms
        .pipe(
          takeUntil(this.ngUnsubscribe),
          debounceTime(100),
          distinctUntilChanged(),
          switchMap((term: string) => this.questionsService.searchQuestions(term))
      ).subscribe(data => {
        this.nothingFound = false;
        this.foundedQuestions = data;
        if (this.foundedQuestions.length === 0) {
          this.nothingFound = true;
        }
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  search(term: string): void {
      this.searchTerms.next(term);
  }

  onKeydown($event) {
    if ($event.keyCode === 40) {
       // todo: check values
    }
  }
}
