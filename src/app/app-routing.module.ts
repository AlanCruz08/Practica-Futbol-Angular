
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, createComponent } from '@angular/core';
import { DivisionComponent } from './components/secure/division/division.component';
import { EstadioComponent } from './components/secure/estadio/estadio.component';
import { FutbolistasComponent } from './components/secure/futbolistas/futbolistas.component';
import { CreateComponent } from './components/secure/futbolistas/Futbolista/create/create.component';
import { validateGuard } from './guards/validate.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [validateGuard] },
  {
    path: 'division', component: DivisionComponent, canActivate: [validateGuard],
    children: [
      { path: 'crear' },
      { path: 'editar' },
    ]
  },
  {
    path: 'estadio', component: EstadioComponent, canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar' },
    ]
  },
  {
    path: 'futbolistas', component: FutbolistasComponent, canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar' },
    ]
  },
  /*{
    path: 'equipos', component: iji, canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar' },
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
