import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EstatesPageComponent } from './estates-page/estates-page.component';
import { EstatesInformationComponent } from './estates-information/estates-information.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route to login
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomePageComponent }, 
  { path: 'estates', component: EstatesPageComponent }, 
  { path: 'estate/:id', component: EstatesInformationComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
