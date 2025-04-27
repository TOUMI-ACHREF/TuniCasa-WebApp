import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EstatesPageComponent } from './estates-page/estates-page.component';
import { EstatesInformationComponent } from './estates-information/estates-information.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route to login
  { path: 'login', component: LoginComponent}, 
  { path: 'register', component: RegisterComponent}, 
  { path: 'home', component: HomePageComponent ,canActivate:[authGuard], data: { roles: ['ROLE_USER'] } }, 
  { path: 'estates', component: EstatesPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER'] }}, 
  { path: 'estate/:id', component: EstatesInformationComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER'] }},
  { path: 'account', component: AccountPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER'] }},
  { path: 'favorites', component: FavoritesPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
