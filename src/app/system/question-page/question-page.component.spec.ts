import { QuestionPageComponent } from './question-page.component';
import { QuestionsService } from '../shared/services/questions.service';
import { AuthorsService } from '../shared/services/authors.service';

describe('UsersComponent', () => {
    let component: QuestionPageComponent;

    beforeEach(() => {
        const questionService = new QuestionsService(null);
        const authorsService = new AuthorsService(null);

        component = new QuestionPageComponent(null, null, questionService, authorsService);
        component.ngOnInit();
    });
});
