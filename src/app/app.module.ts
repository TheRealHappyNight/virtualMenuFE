import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminPageProductsComponent} from './admin-page/products/admin-page-products.component';
import {CategoryListingComponent} from './category-listing/category-listing.component';
import {ProductComponent} from './product/product.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './auth/register/register.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {AddProductComponent} from './add-product/add-product.component';
import {AuthErrorHandler} from './auth/AuthErrorHandler';
import {FlexModule} from '@angular/flex-layout';
import {ProductListingComponent} from './product-listing/product-listing.component';
import {PictureComponent} from './picture/picture.component';
import {ShoppingCartModule} from 'ng-shopping-cart';
import {CartListingComponent} from './cart-listing/cart-listing.component';
import {CartViewComponent} from './cart-view/cart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListingComponent,
    ToolbarComponent,
    AdminPageProductsComponent,
    ProductComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    ProductListingComponent,
    PictureComponent,
    CartListingComponent,
    CartViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FlexModule,
    ShoppingCartModule.forRoot({
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    }),
    MatSelectModule,
  ],
  providers: [httpInterceptorProviders,
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }],
  bootstrap: [AppComponent],
  entryComponents: [AddProductComponent]
})
export class AppModule {
}
