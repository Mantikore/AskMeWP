import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as myGlobals from './global';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';
import { WpCategory } from '../models/wp-category';
import { WpPost } from '../models/wp-post';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    private categoriesUrl = `${myGlobals.href}categories`;
    private categoryPostsUrl = `${myGlobals.href}posts?&_embed&categories=`;

    constructor(
        private http: HttpClient
    ) {}

    getQuestionsByCategory(id: number): Observable<HttpResponse<WpPost[]>> {
        return this.http.get<WpPost[]>(`${this.categoryPostsUrl}${id}`, { observe: 'response' });
    }

    getQuestionCategories(id: number): Observable<Category[]> {
        return this.http.get<WpCategory[]>(`${this.categoriesUrl}?post=${id}`).pipe(map(categoriesData => {
          const categories = [];
          categoriesData.map(item => {
            const category = new Category();
            category.id = item['id'];
            category.name = item['name'];
            category.slug = item['slug'];
            categories.push(category);
          });
          return categories;
        }));
    }
    getCategory(id: number): Observable<Category> {
        return this.http.get<WpCategory>(`${this.categoriesUrl}/${id}`).pipe(map(item => {
          const category = new Category;
          category.name = item.name;
          category.slug = item.slug;
          category.id = item.id;
          return category;
        }));
    }
    searchCategories(term): Observable<Category[]> {
        return this.http.get<WpCategory[]>(`${this.categoriesUrl}?search=${term}`);
    }
}
