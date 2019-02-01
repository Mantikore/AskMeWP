import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoriesService } from '../shared/services/categories.service';
import { QuestionsService } from '../shared/services/questions.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap } from 'rxjs/internal/operators';
import { AuthService } from '../shared/services/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

    categories: string[] = [];   // array of id's categories that will be sended in POST (see WP REST config for creating new post)
    foundedCategories: Category[] = [];
    addedCategories: Category[] = [];
    private searchTerms = new Subject<string>();
    token: string;
    htmlContent: string;

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        uploadUrl: 'v1/images',
    };


    constructor(private categoriesService: CategoriesService,
                private questionsService: QuestionsService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((term: string) => this.categoriesService.searchCategories(term))
        ).subscribe(data => this.foundedCategories = data);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    add(title, htmlContent) {
        title = title.trim();
        htmlContent = htmlContent.trim();
        console.log(htmlContent);
        if (!htmlContent) {
            return ErrorEmpty();
        }
        this.questionsService.addQuestion(title, htmlContent, this.categories, window.localStorage.getItem('token'))
            .subscribe(question => {
                this.router.navigate([`system/question/${question['id']}`], { queryParams: { page: 1 } });
            }, error => console.log(error));
        function ErrorEmpty() {
            if (!htmlContent) {
                alert('Insert text!');
            }
        }
    }

    onClickCategory(cat) {
        const catAlreadyExist = this.addedCategories.find(obj => obj.id === cat.id);
        if (catAlreadyExist === undefined) {
            this.categories.push(`${cat.id}`);
            this.addedCategories.push(cat);
        }
    }

    removeCategory(category) {
        const index = this.addedCategories.findIndex(obj => obj.id === category.id);
        this.addedCategories.splice(index, 1);
        this.categories.splice(index, 1);
    }
}
