import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/util/app-constant'; 
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../categories/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dataSource!:any;
  public url:string = AppConstants.BASE_URL;
  public img_url:string = `${this.url}/v1/file`;
  public productFilterForm!: FormGroup;
  public categoryList!:Array<any>;
  displayedColumns: string[] = ['id', 'name', 'code','price', 'discount', 'categories', 'image', 'action'];

  constructor(
    private router: Router,
    private productService: ProductService,
    private confirmService: NgConfirmService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService:CategoryService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.getCategory();
    this.productFilterForm = this.formBuilder.group({
      name: [''],
      code: [''],
      price: [''],
      discount: [''],
      categories: [''],
    });
  }

  addProduct() {
    this.router.navigate(['/products/add-product']);
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit-product', id]);
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: (res) => {
        this.dataSource = this.getmappedProduct(res)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getmappedProduct(productListData:any) {
    return  _.map(productListData, (p)=>{
          return {
            ...p,
            default_image: `${this.img_url}/${p['default_image']}`,
            categories: _.join(_.map(p.categories, (cat)=> cat['name']), ' | ')
          };
    });
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(catLis =>{
     this.categoryList = _.map(catLis, cat =>{
      return {
        _id:cat._id,
        name: cat.name
      }
     });
    });
  }

  getImageURl(prData:any) {
    console.log(`${this.img_url}/${prData['default_image']}`);
    return `${this.img_url}/${prData['default_image']}` 

  }


  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((res) => {
      this.toastr.success('Product Deleted Successfully');
      this.getProduct();
    });
  }

  getFilteredProduct() {
    const filterValue:any = {};
    _.map(Object.keys(this.productFilterForm.value), (key)=>{
      if (this.productFilterForm.value[key]) {
        filterValue[key] = this.productFilterForm.value[key]
      }
    }); 
   this.productService.getProduct({
    filter: filterValue
   }).subscribe((resData)=>{
      this.dataSource = this.getmappedProduct(resData);
   });
  }

  resetFilter() {
    this.productFilterForm.reset();
  }

}
