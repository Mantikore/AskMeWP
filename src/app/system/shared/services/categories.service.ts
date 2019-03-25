import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as myGlobals from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    private categoriesUrl = `${myGlobals.href}categories`;
    private categoryPostsUrl = `${myGlobals.href}posts?&_embed&categories=`;

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
