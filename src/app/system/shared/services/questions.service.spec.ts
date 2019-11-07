import {QuestionsService} from './questions.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {WpPost} from '../models/wp-post';
import { asyncData, asyncError } from '../../../../testing/async-observable-helpers';
import {Question} from '../models/question';
import { async } from '@angular/core/testing';

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

describe('QuestionsService', () => {
  let service: QuestionsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new QuestionsService(<any> httpClientSpy);
  });

  it('should return questions', () => {
    const response: HttpResponse<WpPost[]> = new HttpResponse<WpPost[]>({body: expectedQuestions});

    httpClientSpy.get.and.returnValue(asyncData(response));

    service.getQuestionsEmbed().subscribe(
      data => expect(data).toEqual(response, 'expected questions'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  it('should return question typed Question', () => {

    httpClientSpy.get.and.returnValue(asyncData(expectedQuestion));

    service.getQuestion(71).subscribe(
      data => {
        expect(data instanceof Question).toBeTruthy();
        expect(data.id).toEqual(71, fail);
        expect(data.text).toEqual('1111', fail);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  it('should return questions on the page', () => {

    const response: HttpResponse<WpPost[]> = new HttpResponse<WpPost[]>({body: expectedQuestions});

    httpClientSpy.get.and.returnValue(asyncData(response));

    service.getQuestionsPage(1).subscribe(
      data => expect(data).toEqual(response, 'expected questions on the page'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', async(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getQuestionsEmbed().subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.error).toContain('test 404 error')
    );
  }));
  it('should add new question', async(() => {

    const response: HttpResponse<WpPost> = new HttpResponse<WpPost>({body: expectedQuestion});

    httpClientSpy.post.and.returnValue(asyncData(response));

    service.addQuestion('hello', 'sample text', [1, 2], 'sampleToken').subscribe(
      data => {
        console.log(data);
        expect(data.body.id).toEqual(71, fail);
      },
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  }));
});
