import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { EstatesSuggComponent } from './estates-sugg/estates-sugg.component';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { FormsModule } from '@angular/forms';
import { EstatesPageComponent } from './estates-page/estates-page.component';
import { EstatesComponent } from './estates/estates.component';
import { EstatesInformationComponent } from './estates-information/estates-information.component';
import { AccountInformationsComponent } from './account-informations/account-informations.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstateEditComponent } from './back-office/estate-edit/estate-edit.component';
import { EstateDetailsComponent } from './back-office/estate-details/estate-details.component';
import { Estates2Component } from './back-office/estates/estates.component';
import { NotfoundComponent } from './back-office/notfound/notfound.component';
import { UsersComponent } from './back-office/users/users.component';
import { UserDetailsComponent } from './back-office/user-details/user-details.component';
import { UserEditComponent } from './back-office/user-edit/user-edit.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    HomePageComponent,
    SearchAreaComponent,
    EstateCardComponent,
    EstatesSuggComponent,
    HomefooterComponent,
    EstatesPageComponent,
    EstatesComponent,
    EstatesInformationComponent,
    AccountInformationsComponent,
    AccountPageComponent,
    FavoritesComponent,
    FavoritesPageComponent,
    Estates2Component,
    EstateEditComponent,
    EstateDetailsComponent,
    NotfoundComponent,
    UsersComponent,
    UserDetailsComponent,
    UserEditComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    { provide: 'BaseURL', useValue: 'http://localhost:8087/api' }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
