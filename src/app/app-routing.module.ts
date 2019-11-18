import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProductListingComponent} from './product-listing/product-listing.component';
import {CartListingComponent} from './cart-listing/cart-listing.component';
import {EntryComponent} from './entry/entry.component';
import {QRCodeModule} from 'angularx-qrcode';
import {EditAdminPageComponent} from './edit-admin-page/edit-admin-page.component';

const appRoutes: Routes = [
  {path: 'restaurant/:uuid/:id', component: EntryComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'category/:id', component: ProductListingComponent},
  {path: 'cart', component: CartListingComponent},
  {path: 'admin/edit', component: EditAdminPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QRCodeModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
