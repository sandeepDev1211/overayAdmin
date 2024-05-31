import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'edit-category/:id',
    component: AddCategoryComponent,
  },
  {
    path: 'view-category/:id',
    component: AddCategoryComponent,
  },
    {
    path: 'add-sub-category',
    component: AddSubCategoryComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
