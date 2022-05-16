import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './utils/token-interceptor';
import { MyProductComponent } from './my-product/my-product.component';
import { MyProductBidComponent } from './my-product-bid/my-product-bid.component';
import { BidWonComponent } from './bid-won/bid-won.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ShowAllProductComponent,
    ViewProductComponent,
    LoginComponent,
    MyProductComponent,
    MyProductBidComponent,
    BidWonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
