import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { User } from './user.model';
import { Country } from './country.model';
import { Global } from './global.model';
import { Worldwide } from './worldwide.model';
import { News } from './news.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  private user: User;
  private country: Country;
  private global: Global;
  private worldwide: Worldwide;

  private data: any;
  private complete_globals_data: any;
  private complete_countries_data: any;
  private complete_all_data: any;


  url_worldwide_summary = "https://api.covid19api.com/summary";
  url_total = "https://corona.lmao.ninja/v2/historical/all";
  url_country_data = "https://api.covid19api.com/total/dayone/country/"

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore,
    private http: HttpClient // To recup the API
    ) { }

    async signInWithGoogle() {
      const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.user = {
        uid: credentials.user.uid,
        displayName: credentials.user.displayName,
        email: credentials.user.email
      };
      this.updateUserData();
      localStorage.setItem("users",JSON.stringify(this.user));
      //this.router.navigate(["worldwide"]);
    } 
  
    private updateUserData() {
      this.firestore.collection("users").doc(this.user.uid).set({
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email
      },
       {merge: true } );
    }

    getUser() {
      if (this.user == null && this.userSignedIn()) {
        this.user = JSON.parse(localStorage.getItem("users")); // to maintain the display name
      } 
      return this.user;
    }

    getAuthorizedUser() {
      //return JSON.parse(localStorage.getItem("users"));
      return this.firestore.collection("users").doc("Authorization").valueChanges();
    }
  
    // check if user is signed in
    userSignedIn() : boolean {
      return JSON.parse(localStorage.getItem("users")) != null;
    }
  
    signOut() {
      this.afAuth.signOut();
      localStorage.removeItem("users");
      this.user = null;
      this.router.navigate(["worldwide"]);
    }

    getCountryData(id: string): Observable<any> {
      return this.http.get(this.url_country_data+id)
    } // To recup data for each contry
    
    getWorldwideSummary(): Observable<any> {
      return this.http.get(this.url_worldwide_summary)
    } // To recup data for wolrdwide

    public loadingGlobalsWorldwideSummary() {
      this.getWorldwideSummary()
      .subscribe(data => {
        this.data = data;

        this.complete_globals_data = this.data.Global;
        this.global = {
          ID: this.complete_globals_data.ID,
          NewConfirmed: this.complete_globals_data.NewConfirmed,
          TotalConfirmed: this.complete_globals_data.TotalConfirmed,
          NewDeaths: this.complete_globals_data.NewDeaths,
          TotalDeaths: this.complete_globals_data.TotalDeaths,
          NewRecovered: this.complete_globals_data.NewRecovered,
          TotalRecovered: this.complete_globals_data.TotalRecovered,
        }
        localStorage.setItem('globals', JSON.stringify(this.global));
          this.updateGlobalsWorldwideSummary();
    });
  }

    private updateGlobalsWorldwideSummary() {
      this.firestore.collection("globals").doc(this.global.ID).set({
        Global: this.global,
      }, {merge: true});
    }

    getGlobal() {
      if (this.global == null) {
        this.global = JSON.parse(localStorage.getItem("globals"));
      }
      return this.global;
    }
    
    public loadingCountriesWorldwideSummary() {
      this.getWorldwideSummary()
      .subscribe(data => {
        this.data = data;

        for (let i=0; i<this.data.Countries.length; i++) {
          this.complete_countries_data = this.data.Countries[i];
          this.country = {
            uid: i.toString(),
            Country: this.complete_countries_data.Country,
            CountryCode: this.complete_countries_data.CountryCode,
            NewConfirmed: this.complete_countries_data.NewConfirmed,
            TotalConfirmed: this.complete_countries_data.TotalConfirmed,
            NewDeaths: this.complete_countries_data.NewDeaths,
            TotalDeaths: this.complete_countries_data.TotalDeaths,
            NewRecovered: this.complete_countries_data.NewRecovered,
            TotalRecovered: this.complete_countries_data.TotalRecovered,
            Date: this.complete_countries_data.Date
          }
          localStorage.setItem("countries", JSON.stringify(this.country));
          this.updateCountriesWorldwideSummary();
        }
      });
    }
      private updateCountriesWorldwideSummary() {
        this.firestore.collection("countries").doc(this.country.Country).set({
          Country: this.country,
        }, {merge: true});
      }  
      
  getCountries() {
    return this.firestore.collection("countries").valueChanges();
  }

  getCountry(id: string) {
    return this.firestore.collection("countries")
    .doc(id).valueChanges();
  }

    getWorldwideTotal(): Observable<any> {
    return this.http.get(this.url_total);
  }
  
  public loadingworldwideData() {
        this.getWorldwideTotal()
        .subscribe(data => {
          this.complete_all_data = data;
          this.worldwide = {
            cases: this.complete_all_data.cases,
            deaths: this.complete_all_data.deaths,
            recovered: this.complete_all_data.recovered
          }
          localStorage.setItem("worldwide", JSON.stringify(this.worldwide));
          this.updateWorldwideData();
      });
    }

    private updateWorldwideData() {
      this.firestore.collection("worldwide").doc("element").set({
        Worldwide: this.worldwide,
      }, {merge: true});
    }

    getWorldwideData() {
      if (this.worldwide == null) {
        this.worldwide = JSON.parse(localStorage.getItem("worldwide"));
      }
      return this.worldwide;
    }

    goToAddNews() {
      this.router.navigate(['add-news']);
    } // go to the add-news components

    goToHome() {
      this.router.navigate(['worldwide']);
    } // go to the worldwide (home) components

    addNews(news: News) {
      /*
      this.firestore.collection("news").doc(this.user.uid)
      .collection("news").add(news);
      this.firestore.collection("news").doc(this.user.uid)
      .collection("total").doc("news").get().subscribe((doc)=>{*/
      this.firestore.collection("news").add(news);
      this.firestore.collection("news").doc(this.user.uid)
      .collection("total").doc("news").get().subscribe((doc)=>{
        let amount: number;
        let category: string;
        if(doc.exists) {
          amount = doc.data()["amount"] + news.amount;
          category = doc.data()["category"] + news.category;
        }
        else {
          amount = news.amount;
          category = news.category;
        }

        if (news.type=="countries") {
         this.firestore.collection("countries").doc(news.country_worldwide).set({
          category: category, amount: amount, lastUpdated: new Date()}, {merge: true});
        }
        if (news.type=="worldwide")  {
          this.firestore.collection("globals").doc(this.global.ID).set({
            category: category, amount: amount, lastUpdated: new Date()}, {merge: true});
        }
      });
    }
}