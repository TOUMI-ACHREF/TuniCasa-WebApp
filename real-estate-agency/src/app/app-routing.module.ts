import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EstatesPageComponent } from './estates-page/estates-page.component';
import { EstatesInformationComponent } from './estates-information/estates-information.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { Estates2Component } from './back-office/estates/estates.component';
import { EstateEditComponent } from './back-office/estate-edit/estate-edit.component';
import { authGuard } from './guards/auth.guard';
import { NotfoundComponent } from './back-office/notfound/notfound.component';
import { UsersComponent } from './back-office/users/users.component';
import { UserEditComponent } from './back-office/user-edit/user-edit.component';
import { UserDetailsComponent } from './back-office/user-details/user-details.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route to login
  { path: 'login', component: LoginComponent}, 
  { path: 'register', component: RegisterComponent}, 
  { path: 'home', component: HomePageComponent ,canActivate:[authGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] } }, 
  { path: 'estates', component: EstatesPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }}, 
  { path: 'estate/:id', component: EstatesInformationComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }},
  { path: 'account', component: AccountPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }},
  { path: 'favorites', component: FavoritesPageComponent  ,canActivate:[authGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] }},

  { path: 'admin/users', component: UsersComponent ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 
  { path: 'admin/users/edit/:id', component: UserEditComponent ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 
  { path: 'admin/users/:id', component: UserDetailsComponent ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 

  { path: 'admin/logs', component: LogsComponent ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 

  { path: 'admin/estates', component: Estates2Component ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 
  { path: 'admin/estates/edit/:id', component: EstateEditComponent ,canActivate:[authGuard], data: { roles: ['ROLE_ADMIN'] }}, 
  { path:"**", component: NotfoundComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
