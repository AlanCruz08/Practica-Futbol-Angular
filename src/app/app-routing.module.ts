
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
//import { tokenGuard } from './guards/token.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DivisionComponent } from './components/secure/division/division.component';
import { EstadioComponent } from './components/secure/estadio/estadio.component';
import { FutbolistasComponent } from './components/secure/futbolistas/futbolistas.component';
import { CreateComponent } from './components/secure/futbolistas/Futbolista/create/create.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

//  { path: 'dashboard', component: DashboardComponent, canActivate: [tokenGuard]},
{ path: 'dashboard', component: DashboardComponent},
  {path: 'division', component: DivisionComponent},
  {path: 'estadio', component: EstadioComponent},
  {path:'futbolistas', component: FutbolistasComponent},


  //Botones
  {path: 'crearFutbolista', component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
