import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  private productIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  ProductForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      // imgColor: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      categories: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.productIdToUpdate = val['id'];
      if (this.productIdToUpdate) {
        this.isUpdateActive = true;
        this.productService
          .getProductById(this.productIdToUpdate)
          .subscribe({
            next: (res) => {
              this.ProductFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

 
  Save() {
    this.productService
    .postProduct(this.ProductForm.value)    .subscribe((res) => {
        this.toastr.success('Category Added Successfully');
        this.router.navigate(['/products']);
        this.ProductForm.reset();
      });
  }

  ProductFormToUpdate(user: Product) {
    this.ProductForm.setValue({
      name: user.name,
       code: user.code,
       price:user.price,
       discount: user.discount,
       category: user.category,
    });
  }

  update() {
    this.productService
      .updateProduct(this.ProductForm.value, this.productIdToUpdate)
      .subscribe((res) => {
        this.toastr.success('Product Updated Successfully');
        this.router.navigate(['/products']);
        this.ProductForm.reset();
      });
  }

// ProductFormToUpdate(user: Product) {
//     this.ProductForm.setValue({
//       productName: user.productName,
//       desc: user.desc,
//       price:user.price,
//       rating: user.rating,
//       discount: user.discount,
//       totalQuantity: user.totalQuantity,
//       categoryID: user.categoryID,
//       subCategoryID: user.subCategoryID,
//     });
//   }

//   update() {
//     this.productService
//       .updateProduct(this.ProductForm.value, this.productIdToUpdate)
//       .subscribe((res) => {
//         this.toastr.success('Product Added Successfully');
//         this.router.navigate(['/categories']);
//         this.ProductForm.reset();
//       });
//   }
  
}
