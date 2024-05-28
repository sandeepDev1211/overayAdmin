import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
})
export class ProductsModule { }
