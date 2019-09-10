import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categoriesIdArray: number[];
  categories: Category[];
  error: '';

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    if (this.categoriesIdArray !== undefined) {
      this.categories = this.categoriesService.getCategories(this.categoriesIdArray);
    } else {
      this.categoriesService.getListedCategories().subscribe(data => {
        this.categories = data;
      },
        err => this.error = err.statusText);
    }
  }
}
