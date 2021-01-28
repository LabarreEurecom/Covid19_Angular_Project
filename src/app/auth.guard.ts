import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Covid19Service } from './covid19.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  list: any;


  constructor(
    private covid19Service: Covid19Service, 
    private router: Router,
    private firestore: AngularFirestore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.covid19Service.userSignedIn()) {
        this.router.navigate(["worldwide"]);
      }

      //var docRef = this.firestore.collection("users").doc("Authorization");

      this.covid19Service.getAuthorizedUser()
        .subscribe((list) =>{
          this.list = list;
          for (let i=0; i<this.list.length; i++) {
            if (this.covid19Service.getUser().email == Object.values(this.list)[i]) {
              this.router.navigate(["add-news"]);
              return true;
            }
          }
          });
          //this.router.navigate(["worldwide"]); 
          // pb bcs return true not taken in account in the subscribe
      return true;
  }
  
}
