import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";




import {RegisterComponent} from './auth/register/register.component';
import {LogInComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AuthService } from "./auth/services/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        RegisterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
