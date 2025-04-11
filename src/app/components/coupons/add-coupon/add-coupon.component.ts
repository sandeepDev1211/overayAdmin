import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CouponServiceService } from '../coupon-service.service';
//import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { Category } from '../models/category.model';
import { NgConfirmService } from 'ng-confirm-box';
import { Coupon } from '../models/coupons.model';
import { ProductService } from '../../products/product.service';
import * as _ from 'lodash';
import { CategoryService } from '../../categories/category.service';
import { AppConstants } from 'src/app/util/app-constant';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent {
  public url:string = AppConstants.BASE_URL; 
  private couponIdToUpdate!:string;
  public isUpdateActive: boolean = false;
  couponForm!: FormGroup;
  public productList!:Array<any>;
  public categoryList!:Array<any>;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private couponService: CouponServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService:ProductService,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
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
            next: (res:any) => {
              res.applicable_products = _.map(res.applicable_products , (pr)=> pr._id);
              res.applicable_categories = _.map(res.applicable_categories, (cr)=> cr._id);
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
    let fromDate = this.couponForm.value.valid_from,
        untilDate = this.couponForm.value.valid_until;
        if(fromDate && untilDate && new Date(fromDate) > new Date(untilDate)) {
          this.toastr.error('Un-till Date always greater than from date!');
        }
    this.couponService
      .postcoupon(this.couponForm.value)
      .subscribe((res) => {
        this.toastr.success('Coupon Added Successfully');
        this.router.navigate(['/coupons']);
        this.couponForm.reset();
      }, (err)=>{
        this.toastr.error(err?.error);
      });
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: (res) => {
        this.productList = _.map(res, (p)=>{
          return {
             name: p.name,
            _id: p._id 
          };
        });
        console.log("this.productList: ",this.productList);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategories(){
    this.categoryService.getCategory().subscribe((catList) => {
     this.categoryList = _.map(catList, (cat:any)=> {
       return {
         name: cat.name,
         _id: cat._id,
         description: cat.description
       }
     });
    });
   }

  couponFormToUpdate(data:any) {
    this.couponForm.patchValue(data);
  }

  update() {
    if (this.couponIdToUpdate) {
      this.couponForm.value['_id'] = this.couponIdToUpdate;
    } 
    this.couponService
      .updatecoupon(this.couponForm.value)
      .subscribe((res) => {
        this.toastr.success('Coupon Updated Successfully');
        this.router.navigate(['/coupons']);
        this.couponForm.reset();
      });
  }
}
