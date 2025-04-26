import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormGroup, FormsModule } from '@angular/forms';
import { EstatesPageComponent } from './estates-page/estates-page.component';
import { EstatesComponent } from './estates/estates.component';
import { EstatesInformationComponent } from './estates-information/estates-information.component';
import { AccountInformationsComponent } from './account-informations/account-informations.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminBoardComponent } from './admin-board/admin-board.component';

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
    AdminBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BaseURL', useValue: 'http://localhost:8087/api' }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
