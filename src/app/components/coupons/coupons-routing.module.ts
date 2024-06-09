import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CouponsComponent } from './coupons.component';
import { CouponComponent } from './coupons.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
// import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CouponComponent ,
  },
  {
    path: 'add-coupon',
    component: AddCouponComponent,
  },
  {
    path: 'edit-coupon/:id',
    component: AddCouponComponent,
  },
  {
    path: 'view-coupon/:id',
    component: AddCouponComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsRoutingModule {}
