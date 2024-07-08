import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { CouponsRoutingModule } from './coupons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgConfirmModule } from 'ng-confirm-box';
//import { CouponsComponent } from './coupons.component';
import { CouponComponent } from './coupons.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE,} from '@angular/material/core';


@NgModule({
  declarations: [
    CouponComponent,
    AddCouponComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatOptionModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgConfirmModule,
    MatDatepickerModule,
    ToastrModule.forRoot()
  ],
  providers: [MatNativeDateModule,
    {provide: MAT_DATE_LOCALE, useValue: {useUtc: true} }
    
  ]
})
export class CouponsModule { }