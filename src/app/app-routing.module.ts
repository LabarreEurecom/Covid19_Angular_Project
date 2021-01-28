import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewsComponent } from './add-news/add-news.component';
import { AuthGuard } from './auth.guard';
import { CountryComponent } from './country/country.component';
import { WorldwideComponent } from './worldwide/worldwide.component'

const routes: Routes = [
  {path: "worldwide", component: WorldwideComponent},
  {path: "add-news", component: AddNewsComponent, 
  canActivate: [AuthGuard]},
  {path: "worldwide/:id", component: CountryComponent},
  { path: "", pathMatch: "full", redirectTo: "worldwide" },
  { path: "**", redirectTo: "worldwide" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
