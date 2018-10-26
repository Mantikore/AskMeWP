import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() question: number;
  categories: Category[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getQuestionCategories(this.question).subscribe(data => {
        const categories = [];
        for (const item of Object.values(data)) {
            const category = new Category();
            category.id = item['id'];
            category.name = item['name'];
            category.slug = item['slug'];
            categories.push(category);
        }
        return this.categories = categories;
    });

  }

}
