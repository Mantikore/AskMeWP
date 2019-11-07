import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() categoriesIdArray: number[];
  categories: Category[];
  error: '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    if (this.categoriesIdArray !== undefined) {
      this.categories = this.categoriesService.getCategories(this.categoriesIdArray);
    } else {
      this.categoriesService.getListedCategories().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.categories = data;
      },
        err => this.error = err.statusText);
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
