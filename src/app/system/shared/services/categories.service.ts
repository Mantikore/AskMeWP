import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    private categoriesUrl = 'http://localhost/angularwp/wp-json/wp/v2/categories';
    private categoryPostsUrl = 'http://localhost/angularwp/wp-json/wp/v2/posts?&_embed&categories=';

    constructor(
        private http: HttpClient
    ) {}

    getQuestionsByCategory(id: number): Observable<any> {
        return this.http.get(`${this.categoryPostsUrl}${id}`, { observe: 'response' });
    }

    getQuestionCategories(id: number): Observable<any> {
        return this.http.get(`${this.categoriesUrl}?post=${id}`);
    }
    getCategory(id: number): Observable<any> {
        return this.http.get(`${this.categoriesUrl}/${id}`);
    }
    searchCategories(term): Observable<any> {
        return this.http.get(`${this.categoriesUrl}?search=${term}`);
    }
}