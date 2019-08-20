import { QuestionPageComponent } from './question-page.component';
import { QuestionsService } from '../shared/services/questions.service';
import { AuthorsService } from '../shared/services/authors.service';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs/index';
import { fromObservable } from 'rxjs/internal/observable/fromObservable';
import { empty } from 'rxjs/internal/Observer';

describe('UsersComponent', () => {
    let component: QuestionPageComponent;

    beforeEach(() => {
        const questionService = new QuestionsService(null, null);
        const authorsService = new AuthorsService(null);
        component = new QuestionPageComponent(null, questionService, authorsService);
        component.ngOnInit();
    });

    it('should get id from the snapshot of the route', () => {
        const questionData = [];
        expect(component.routeId).toBeGreaterThan(0);
    });
});
