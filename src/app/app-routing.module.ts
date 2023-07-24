
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DivisionComponent } from './components/secure/division/division.component';
import { EstadioComponent } from './components/secure/estadio/estadio.component';
import { FutbolistasComponent } from './components/secure/futbolistas/futbolistas.component';
import { CreateComponent } from './components/secure/futbolistas/Futbolista/create/create.component';
import { validateGuard } from './guards/validate.guard';
import { CreateEstadioComponent } from './components/secure/estadio/create-estadio/create-estadio.component';
import { CreateDivisionComponent } from './components/secure/division/create-division/create-division.component';
import { EquiposComponent } from './components/secure/equipos/equipos.component';
import { UpdateComponent } from './components/secure/futbolistas/Futbolista/update/update.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [validateGuard] },
  
  
  { path: 'futbolistas', component: FutbolistasComponent },
  { path: 'crearFutbolista', component: CreateComponent },
  { path: 'editarFutbolista/:id', component: UpdateComponent },
  
  /*
  {
    path: 'division', component: DivisionComponent,
    canActivate: [validateGuard],
    children: [
     // { path: 'crear', component: CreateComponent },
    // { path: 'editar', component: CreateComponent },
    ]
  },
  {
    path: 'estadio', component: EstadioComponent, 
    canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar', component: CreateComponent },
    ]
  },
  {
    path: 'futbolistas', component: FutbolistasComponent, 
    canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar', component: CreateComponent },
    ]
  },
  {
    path: 'equipos', component: EquiposComponent, 
    canActivate: [validateGuard],
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar', component: CreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/
