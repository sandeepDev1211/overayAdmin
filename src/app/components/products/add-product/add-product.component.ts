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
import { AppConstants } from 'src/app/util/app-constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  public url:string = AppConstants.BASE_URL;
  public img_url:string = `${this.url}/v1/file`;
  private productIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  ProductForm!: FormGroup;
  public categoryList:Array<Category> = [];
  public fileName:string  = 'Select Product Image';
  public currentFile:any;
  public prdctImgUrl!:string;

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
      name: ['', Validators.required],
      code: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      categories: ['', Validators.required],
      quantity: ['',Validators.required],
      weight: ['',Validators.required],
      keywords: ['',Validators.required],
      long_description: ['',Validators.required],
      description: ['',Validators.required],
      sku: ['',Validators.required],
      color: ['',Validators.required],
      size: ['',Validators.required],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.productIdToUpdate = val['id'];
      if (this.productIdToUpdate) {
        this.isUpdateActive = true;
        this.productService
          .getProductById(this.productIdToUpdate)
          .subscribe({
            next: (res:any) => {
              this.prdctImgUrl = `${this.img_url}/${res['default_image']}`;
              console.log("image url : ",this.prdctImgUrl);
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

  ProductFormToUpdate(product: Product) {
    this.ProductForm.setValue({
      name: product.name,
       code: product.code,
       price:product.price,
       discount: product.discount,
       categories: _.map(product.categories, (cat:any)=> cat['_id']),
    });
  }

  update() {
    const formData: FormData = new FormData();
    if (this.currentFile) {
      formData.append('image', this.currentFile);
    }
    formData.append('data', JSON.stringify({...this.ProductForm.value, _id:this.productIdToUpdate}));
    this.productService
    .updateProduct(formData).subscribe((res) => {
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
