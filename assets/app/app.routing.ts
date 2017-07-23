import { Routes, RouterModule } from "@angular/router";
import {LogInComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';



const APP_ROUTES: Routes = [
    { path: '', component:HomeComponent, pathMatch: 'full' },
    {path:'login' ,component:LogInComponent},
    {path:'register' ,component:RegisterComponent},
    {path:'**',redirectTo:''}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
