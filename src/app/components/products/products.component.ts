import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['productName', 'desc', 'price', 'rating','discount','totalQuantity','categoryID','subCategoryID'];

  constructor(
    private router: Router,
    private categoryService: ProductService,
    private confirmService: NgConfirmService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  addProduct() {
    this.router.navigate(['/categories/add-product']);
  }

  editProduct(id: number) {
    this.router.navigate(['/categories/edit-product', id]);
  }

  getProducts() {
    this.categoryService.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    this.categoryService.deleteProduct(id).subscribe((res) => {
      this.toastr.success('Category Deleted Successfully');
      this.getProducts();
    });
  }

}
