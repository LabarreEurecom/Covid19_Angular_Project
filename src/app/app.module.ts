import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';


import { WorldwideComponent } from './worldwide/worldwide.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewsComponent,
    WorldwideComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
