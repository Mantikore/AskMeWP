import { QuestionsService } from './questions.service';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Question } from '../models/question';
import { Author } from '../models/author';
import { WpPost } from '../models/wp-post';
import * as myGlobals from './global';
import { from, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { asyncData } from '../../../../testing/async-observable-helpers';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new QuestionsService(<any> httpClientSpy);
  });

  // it('#getObservableValue should return value from observable',
  //   (done: DoneFn) => {
  //     service.getObservableValue().subscribe(value => {
  //       expect(value).toBe('observable value');
  //       done();
  //     });
  //   });

  it('should return expected heroes (HttpClient called once)', () => {
    const responseJson = [
      {
        idhhh: 71,
        date: '2019-09-10T18:44:42',
        slug: 'elena-3',
        status: 'publish',
        typeyyy: 'post',
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
    console.log(body);
    const response: HttpResponse<WpPost[]> = new HttpResponse<WpPost[]>(body);
    console.log(response);

    httpClientSpy.get.and.returnValue(asyncData(response));

    service.getQuestionsEmbed().subscribe(
      data => expect(data).toEqual(response, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
