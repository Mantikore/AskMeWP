import {QuestionsService} from './questions.service';
import {HttpResponse} from '@angular/common/http';
import {WpPost} from '../models/wp-post';
import {plainToClass} from 'class-transformer';
import {asyncData} from '../../../../testing/async-observable-helpers';
import {Question} from '../models/question';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new QuestionsService(<any> httpClientSpy);
  });

  it('should return questions', () => {
    const responseJson = [
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
          3,
          10
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
          3,
          10
        ],
        tags: []
      },
    ];

    const body: WpPost[] = responseJson.map(item => plainToClass(WpPost, item));
    const response: HttpResponse<WpPost[]> = new HttpResponse<WpPost[]>({body: body});

    httpClientSpy.get.and.returnValue(asyncData(response));

    service.getQuestionsEmbed().subscribe(
      data => expect(data).toEqual(response, 'expected questions'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return question', () => {
    const responseJson = {
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
        3,
        10
      ],
      tags: []
    };

    const body: WpPost = plainToClass(WpPost, responseJson);
    httpClientSpy.get.and.returnValue(asyncData(body));

    service.getQuestion(71).subscribe(
      data => {
        expect(data.id).toEqual(71, 'expected id');
        expect(data.text).toEqual('1111', 'expected text');
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
