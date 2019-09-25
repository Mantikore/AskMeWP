import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReadMorePipe } from '../shared/pipes/readmore.pipe';
import { QuestionsService } from '../shared/services/questions.service';
import { CategoriesService } from '../shared/services/categories.service';
import { AnswersService } from '../shared/services/answers.service';
import { PaginationService } from '../shared/services/pagination.service';
import { WpPost } from '../shared/models/wp-post';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';

const expectedQuestions = [
  {
    id: 71,
    date: '2019-09-10T18:44:42',
    slug: 'elena-3',
    status: 'publish',
    type: 'post',
    title: {
      rendered: 'VueJS search filter error: cannot ready search of undefined'
    },
    content: {
      rendered: '1111',
      protected: false
    },
    author: 1,
    categories: [
      0,
      5
    ],
    tags: []
  },
  {
    id: 70,
    date: '2019-09-10T18:44:42',
    slug: 'elena',
    status: 'publish',
    type: 'post',
    title: {
      rendered: 'Vuenot ready search of undefined'
    },
    content: {
      rendered: `<p>Im building an app to consume a json and list it with a search filter input and other stuffs</p>
            <p>I&#8217;ve already tried to create the function but didnt workined</p>\n`,
      protected: false
    },
    author: 2,
    categories: [
      0,
      10
    ],
    tags: []
  },
]  as WpPost[];
const expectedQuestion = expectedQuestions[0] as WpPost;

const expectedCategory = {
  id: 3,
  count: 6,
  name: 'JavaSzcript',
  slug: 'javascript',
};

const expectedHeaders = new HttpResponse({headers: new HttpHeaders({'x-wp-total': '3'})})

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {

    @Component({selector: 'app-error-indicator', template: ''})
    class ErrorIndicatorStubComponent {
      err: '';
    }

    @Component({selector: 'app-loader', template: ''})
    class LoaderStubComponent {}

    @Component({selector: 'app-categories', template: ''})
    class CategoriesStubComponent {}

    @Component({selector: 'app-paginator', template: ''})
    class PaginatorStubComponent {}

    const questionsService = jasmine.createSpyObj('QuestionsService', ['getQuestionsEmbed', 'getQuestionsPage']);
    const getQuestionsEmbedSpy = questionsService.getQuestionsEmbed.and.returnValue( of(expectedQuestions) );
    const getQuestionsPageSpy = questionsService.getQuestionsPage.and.returnValue( of(expectedQuestions) );

    const categoriesService = jasmine.createSpyObj('CategoriesService', ['getCategory', 'getQuestionsByCategory']);
    const getCategorySpy = categoriesService.getCategory.and.returnValue( of(expectedCategory) );
    const getQuestionsByCategorySpy = categoriesService.getQuestionsByCategory.and.returnValue( of(expectedQuestions) );

    const answersService = jasmine.createSpyObj('AnswersService', ['getAnswersCount']);
    const getAnswersCountSpy = answersService.getAnswersCount.and.returnValue( of(expectedHeaders) );

    const paginationService = jasmine.createSpyObj('PaginationService', ['getPagesCount']);
    const getPagesCountSpy = paginationService.getPagesCount.and.returnValue( of(3) );

    const activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        QuestionsComponent,
        ErrorIndicatorStubComponent,
        LoaderStubComponent,
        CategoriesStubComponent,
        PaginatorStubComponent,
        ReadMorePipe,
        RouterLinkDirectiveStub,
      ],
      providers: [
        { provide: QuestionsService, useValue: questionsService },
        { provide: CategoriesService, useValue: categoriesService },
        { provide: AnswersService, useValue: answersService },
        { provide: PaginationService, useValue: paginationService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should pluralize answers', () => {
    expect(component.pluralizeAnswers(1)).toBe('answer');
    expect(component.pluralizeAnswers(3)).toBe('answers');
  });

});
