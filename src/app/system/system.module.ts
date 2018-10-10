import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SystemComponent } from './system.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { SystemRoutingModule } from './system-routing.module';
import { QuestionsService } from './shared/services/questions.service';
import { AnswersService } from './shared/services/answers.service';
import { AnswersComponent } from './answers/answers.component';
import { MostActiveAuthorsComponent } from './shared/components/most-active-authors/most-active-authors.component';
import { ReadMorePipe } from './shared/pipes/readmore.pipe';
import { AuthorPageComponent } from './author-page/author-page.component';
import { SearchComponent } from './shared/components/search/search.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './shared/components/categories/categories.component';

@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        SystemComponent,
        QuestionsComponent,
        QuestionPageComponent,
        AnswersComponent,
        MostActiveAuthorsComponent,
        ReadMorePipe,
        AuthorPageComponent,
        SearchComponent,
        LoginComponent,
        CategoriesComponent
    ],
    providers: [
        QuestionsService,
        AnswersService
    ],
    exports: [
        ReadMorePipe
    ]
})

export class SystemModule {

}
