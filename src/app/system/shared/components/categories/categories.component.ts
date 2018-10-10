import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Categorie } from '../../models/categorie';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() question: number;
  categories: Categorie[];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.questionsService.getQuestionCategories(this.question).subscribe(data => {
        const categories = [];
        for (const item of Object.values(data)) {
            const categorie = new Categorie();
            categorie.id = item['id'];
            categorie.name = item['name'];
            categorie.slug = item['slug'];
            categories.push(categorie);
        }
        return this.categories = categories;
    });

  }

}
