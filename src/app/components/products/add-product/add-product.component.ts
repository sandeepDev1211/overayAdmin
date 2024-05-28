import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductServiceService } from '../product-service.service';
import { CoreService } from 'src/app/util/core-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent  {

  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductServiceService,
    private _dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.productForm = this._fb.group({
      productName: '',
      category: '',
    });
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this._productService
          .updateProduct(this.data.id, this.productForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Product updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._productService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


}
