import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
    {path: '', component: SystemComponent,  children: [
        {path: 'questions', component: QuestionsComponent},
        {path: 'question/:id', component: QuestionPageComponent},
        {path: 'author/:slug', component: AuthorPageComponent},
        {path: 'category/:id', component: QuestionsComponent},
        {path: 'add-question', component: AddQuestionComponent, canActivate: [AuthGuard]}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SystemRoutingModule {

}
