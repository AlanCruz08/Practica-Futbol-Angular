import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { NavComponent } from './components/secure/nav/nav.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FutbolistasComponent } from './components/secure/futbolistas/futbolistas.component';
import { CreateComponent } from './components/secure/futbolistas/Futbolista/create/create.component';
import { UpdateComponent } from './components/secure/futbolistas/Futbolista/update/update.component';
import { DivisionComponent } from './components/secure/division/division.component';
import { EstadioComponent } from './components/secure/estadio/estadio.component';
import { HighlightDirective } from './directives/highlight.directive';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent,
    FutbolistasComponent,
    CreateComponent,
    UpdateComponent,
    DivisionComponent,
    EstadioComponent,
    HighlightDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
