import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';



const routes: Routes = [
    {path: '', component: SidebarComponent,  children: [
        {path: 'login', component: LoginComponent},
        {path: 'registration', component: RegistrationComponent},
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
