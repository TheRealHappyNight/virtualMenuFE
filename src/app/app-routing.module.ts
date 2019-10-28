import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {CategoryListingComponent} from './category/category-listing.component';

const appRoutes: Routes = [
  {path: '', component: CategoryListingComponent},
  {path: 'admin', component: AdminPageComponent},
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
