import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  private categoryIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  categoryForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.categoryIdToUpdate = val['id'];
      if (this.categoryIdToUpdate) {
        this.isUpdateActive = true;
        this.categoryService
          .getCategoryById(this.categoryIdToUpdate)
          .subscribe({
            next: (res) => {
              this.categoryFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  Save() {
    this.categoryService
      .postCategory(this.categoryForm.value)
      .subscribe((res) => {
        this.toastr.success('Category Added Successfully');
        this.router.navigate(['/categories']);
        this.categoryForm.reset();
      });
  }

  categoryFormToUpdate(user: Category) {
    this.categoryForm.setValue({
      name: user.name,
      type: user.type,
    });
  }

  update() {
    this.categoryService
      .updateCategory(this.categoryForm.value, this.categoryIdToUpdate)
      .subscribe((res) => {
        this.toastr.success('Category Updated Successfully');
        this.router.navigate(['/categories']);
        this.categoryForm.reset();
      });
  }
}
