import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CouponServiceService } from '../coupon-service.service';
//import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Category } from '../models/category.model';
import { NgConfirmService } from 'ng-confirm-box';
import { Coupon } from '../models/coupons.model';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent {
  private couponIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  couponForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private couponService: CouponServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      code: ['', Validators.required],
      discount_type: ['', Validators.required],
      discount_value: ['', Validators.required],
      valid_from: ['', Validators.required],
      valid_until: ['', Validators.required],
      min_order_amount: ['', Validators.required],
      applicable_products: ['', Validators.required],
      applicable_categories: ['', Validators.required],
      usage_limit: ['', Validators.required],
      used_count: ['', Validators.required],
      is_active: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.couponIdToUpdate = val['id'];
      if (this.couponIdToUpdate) {
        this.isUpdateActive = true;
        this.couponService
          .getcouponById(this.couponIdToUpdate)
          .subscribe({
            next: (res) => {
              this.couponFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  Save() {
    this.couponService
      .postcoupon(this.couponForm.value)
      .subscribe((res) => {
        this.toastr.success('Coupon Added Successfully');
        this.router.navigate(['/coupons']);
        this.couponForm.reset();
      });
  }

  couponFormToUpdate(user: Coupon) {
    this.couponForm.setValue({
      code: user.code,
      discount_type: user.discount_type,
      //  discount_value: user.discount_value,
      //  valid_from:user.valid_from
    });
  }

  update() {
    this.couponService
      .updatecoupon(this.couponForm.value, this.couponIdToUpdate)
      .subscribe((res) => {
        this.toastr.success('Coupon Updated Successfully');
        this.router.navigate(['/coupons']);
        this.couponForm.reset();
      });
  }
}
