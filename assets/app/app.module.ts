import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";


import {SignInComponent} from './auth/signin.component'
import {SignUpComponent} from './auth/signup.component'
import { LogoutComponent } from "./auth/logout.component";

import {HeaderComponent} from './header.component';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { routing } from "./app.routing";

import { AuthService } from "./auth/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        SignInComponent,
        SignUpComponent,
        LogoutComponent
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
