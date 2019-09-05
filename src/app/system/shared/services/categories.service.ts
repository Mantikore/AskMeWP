import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { from } from 'rxjs';
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
    public allCategories = [];
    private categoriesUrl = `${myGlobals.href}categories`;
    private categoryPostsUrl = `${myGlobals.href}posts?&_embed&categories=`;

    constructor(private http: HttpClient) {
        this.getAllCategories();
    }

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

    getAllCategories() {
        this.http.get<WpCategory[]>(`${this.categoriesUrl}`).subscribe(data => {
          this.allCategories = data;
        });
        return this.allCategories;
    }
    getListedCategories(): Observable<Category[]> {
      return this.http.get<WpCategory[]>(`${this.categoriesUrl}`).pipe(map(categoriesData => {
        const categories = [];
        categoriesData.map(item => {
          const category = new Category();
          category.id = item['id'];
          category.name = item['name'];
          category.slug = item['slug'];
          category.count = item['count'];
          categories.push(category);
        });
        return categories;
      }));
    }
    getCategories(categoriesIdArray): Category[] {
        const indexedCategories = {};
        const neededCategories = [];
        for (const category of this.allCategories) {
          indexedCategories[category.id] = { name: category.name, slug: category.slug };
        }
        for (const categoryId of categoriesIdArray) {
          neededCategories.push({id: categoryId, name: indexedCategories[categoryId].name, slug: indexedCategories[categoryId].slug});
        }
        return neededCategories;
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
