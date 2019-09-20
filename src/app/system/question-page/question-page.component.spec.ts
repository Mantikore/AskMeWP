import { QuestionPageComponent } from './question-page.component';
import { QuestionsService } from '../shared/services/questions.service';
import { AuthorsService } from '../shared/services/authors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs/index';
import { fromObservable } from 'rxjs/internal/observable/fromObservable';
import { empty } from 'rxjs/internal/Observer';
import { CategoriesService } from '../shared/services/categories.service';

describe('UsersComponent', () => {
    let component: QuestionPageComponent;

    beforeEach(() => {
        const questionService = new QuestionsService(null);
        const authorsService = new AuthorsService(null);

        component = new QuestionPageComponent(null, null, questionService, authorsService);
        component.ngOnInit();
    });


});
