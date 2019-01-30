import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../models/question';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    private searchTerms = new Subject<string>();
    foundedQuestions: Question[] = [];
    nothingFound: Boolean = false;


    constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
      this.searchTerms.pipe(
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

  search(term: string): void {
      this.searchTerms.next(term);
  }

}
