// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { Router } from '@angular/router';
// import { CouponServiceService } from './coupon-service.service';
// //import { CategoryService } from './coupon.service';
// import { NgConfirmService } from 'ng-confirm-box';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-coupon',
//   templateUrl: './coupons.component.html',
//   styleUrls: ['./coupons.component.scss'],
// })
// export class CouponComponent implements OnInit {
//   dataSource!: MatTableDataSource<any>;
//   displayedColumns: string[] = ['id','code','discount_type', 'discount_value', 'valid_from', 'valid_until', 'min_order_amount', 'applicable_products', 'applicable_categories',
//     'usage_limit', 'used_count', 'is_active'
//   ];

//   constructor(
//     private router: Router,
//     private couponService: CouponServiceService,
//     private confirmService: NgConfirmService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit() {
//     this.getCoupons();
//   }

//   addCoupon() {
//     this.router.navigate(['/coupons/add-coupon']);
//   }

//   editCoupon(id: number) {
//     this.router.navigate(['/coupons/edit-coupon', id]);
//   }

//   getCoupons() {
//     this.couponService.getcoupon().subscribe({
//       next: (res) => {
//         this.dataSource = new MatTableDataSource(res);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   deleteCoupon(id: number) {
//     this.couponService.deletecoupon(id).subscribe((res) => {
//       this.toastr.success('coupon Deleted Successfully');
//       this.getCoupons();
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CouponServiceService } from './coupon-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})
export class CouponComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id', 'code', 'discount_type', 'discount_value', 
    'valid_from', 'valid_until', 'min_order_amount', 
    'applicable_products', 'applicable_categories', 
    'usage_limit', 'used_count', 'is_active'
  ];

  constructor(
    private router: Router,
    private couponService: CouponServiceService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCoupons();
  }

  addCoupon() {
    this.router.navigate(['/coupons/add-coupon']);
  }

  editCoupon(id: number) {
    this.router.navigate(['/coupons/edit-coupon', id]);
  }

  getCoupons() {
    this.couponService.getcoupon().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

 
}
