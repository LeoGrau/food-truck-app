import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { RegisterViewComponent } from './pages/register-view/register-view.component';

const routes: Routes = [
  { path: "", component: HomeViewComponent },
  { path: "home", component: HomeViewComponent},
  { path: "owners/food-trucks/new", component: RegisterViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
