import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/util/app-constant'; 
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dataSource!:any;
  public url:string = AppConstants.BASE_URL;
  public img_url:string = `${this.url}/v1/file`;
  displayedColumns: string[] = ['id', 'name', 'code','price', 'discount', 'categories', 'image', 'action'];

  constructor(
    private router: Router,
    private productService: ProductService,
    private confirmService: NgConfirmService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  addProduct() {
    this.router.navigate(['/products/add-product']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit-product', id]);
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: (res) => {
        this.dataSource = _.map(res, (p)=>{
          return {
            ...p,
            default_image: `${this.img_url}/${p['default_image']}`,
            categories: _.join(_.map(p.categories, (cat)=> cat['name']), ' | ')
          };
        });
      },
      error: (err) => {
        console.log(err);
      },
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
}
