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
  categories: object[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories(this.categoriesIdArray);
  }
}
