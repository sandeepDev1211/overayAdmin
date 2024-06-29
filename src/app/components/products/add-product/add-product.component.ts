import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CategoryService } from '../../categories/category.service';
import * as _ from 'lodash';
import { CategoriesModule } from '../../categories/categories.module';
import { Category } from '../../categories/models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  private productIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  ProductForm!: FormGroup;
  public categoryList:Array<Category> = [];
  public fileName:string  = 'Select Product Image';
  public currentFile:any;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService:CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.ProductForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
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
    const formData: FormData = new FormData();
    formData.append('image', this.currentFile);
    formData.append('data', JSON.stringify(this.ProductForm.value));
    this.productService
    .postProduct(formData).subscribe((res) => {
        this.toastr.success('Product Added Successfully');
        this.router.navigate(['/products']);
        this.ProductForm.reset();
      });
  }

  getCategories(){
   this.categoryService.getCategory().subscribe((catList) => {
    this.categoryList = _.map(catList, (cat:Category)=> {
      return {
        name: cat.name,
        _id: cat._id,
        description: cat.description
      }
    });
   });
  }


  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.currentFile = null;
      this.fileName = 'Select File';
    }
  }

  upload(): void {

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
