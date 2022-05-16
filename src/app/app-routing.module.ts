import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { MyProductComponent } from './my-product/my-product.component';
import { MyProductBidComponent } from './my-product-bid/my-product-bid.component';
import { BidWonComponent } from './bid-won/bid-won.component';


const routes: Routes = [
  { path: '', component: ShowAllProductComponent },
  { path: 'add-product', component: AddProductComponent },
  // { path: 'edit-product/:productId', redirectTo: '/add-product', pathMatch: 'full' },
  { path: 'edit-product/:productId', component: AddProductComponent },
  { path: 'show-all-product', component: ShowAllProductComponent },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'my-product', component: MyProductComponent },
  { path: 'my-productbid', component: MyProductBidComponent },
  { path: 'bid-won', component: BidWonComponent },
  { path: '**', component: ShowAllProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
