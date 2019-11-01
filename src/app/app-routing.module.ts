import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {CategoryListingComponent} from './category/category-listing.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

const appRoutes: Routes = [
  {path: '', component: CategoryListingComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
