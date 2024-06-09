import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'code','price', 'discount', 'categories', 'action'];

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
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      this.toastr.success('Product Deleted Successfully');
      this.getProduct();
    });
  }
}
