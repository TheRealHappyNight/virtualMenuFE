import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {CategoryListingComponent} from './category-listing/category-listing.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProductListingComponent} from './product-listing/product-listing.component';

const appRoutes: Routes = [
  {path: '', component: CategoryListingComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'category/:id', component: ProductListingComponent},
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
