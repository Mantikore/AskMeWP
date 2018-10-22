import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';
import { QuestionsService } from '../shared/services/questions.service';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subject } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  categories: Category[] = [];
  cats$: Observable<Category[]>;
  newQuestion: number;
  private searchTerms = new Subject<string>();

  constructor(
      private categoriesService: CategoriesService,
      private questionsService: QuestionsService,
      private router: Router,
  ) {}

  ngOnInit() {
      // this.getCategories();
      this.cats$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term: string) => this.categoriesService.searchCategories(term)),
      );

  }

  search(term: string): void {
      this.searchTerms.next(term);
  }

  // getCategories() {
  //   this.categoriesService.getAllCategories().subscribe(data => {
  //       this.categories = [];
  //       for (const item of Object.values(data)) {
  //           const category = new Category();
  //           category.id = item['id'];
  //           category.name = item['name'];
  //           category.slug = item['slug'];
  //           this.categories.push(category);
  //       }
  //       return this.categories;
  //   });
  // }
  add(title, text) {
      title = title.trim();
      text = text.trim();
      if (!text) {
          return ErrorEmpty();
      }
      this.questionsService.addQuestion(title, text)
          .subscribe(question => {
              this.newQuestion = question['id'];
          });
      this.router.navigate(['system/questions']);
      function ErrorEmpty() {
          if (!text) {
              alert('Insert text!');
          }
      }
  }
  onClickCategory(cat) {
      console.log(cat);
      this.categories.push(cat.id);
  }
}
