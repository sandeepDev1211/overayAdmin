import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','description', 'action'];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private confirmService: NgConfirmService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  addCategory() {
    this.router.navigate(['/categories/add-category']);
  }

  editCategory(id: number) {
    this.router.navigate(['/categories/edit-category', id]);
  }

  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((res) => {
      this.toastr.success('Category Deleted Successfully');
      this.getCategories();
    });
  }
}
