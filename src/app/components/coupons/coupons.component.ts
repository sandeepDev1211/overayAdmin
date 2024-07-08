import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CouponServiceService } from './coupon-service.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';


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
    'usage_limit', 'used_count', 'is_active', 'action'
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

  editCoupon(id: string) {
    this.router.navigate([`/coupons/edit-coupon/${id}`]);
  }

  getCoupons() {
    this.couponService.getcoupon().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(_.map(res, (cpn)=>{
          return {
            ...cpn,
            applicable_categories: _.map(cpn.applicable_categories, (cat)=> { 
              return cat.name
            }).join(' || '),
            applicable_products: _.map(cpn.applicable_products, (prd)=> { 
              return prd.name
            }).join(' || ')
          }
        }));
      },
      error: (err) => {
        console.error(err.error);
      },
    });
  }

  deleteCoupon(id:string) {
    this.couponService.deletecoupon(id).subscribe((res)=>{
      this.toastr.success('Coupon Updated Successfully');
      this.getCoupons();
    },
    (err)=>{

    });
  }
 
}
