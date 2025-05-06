import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { NgConfirmService } from 'ng-confirm-box';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  public categoryIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  public categories:Array<Category> = [];
  categoryForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getCategories();
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      parent_category: ['']
    });

    this.activatedRoute.params.subscribe((val) => {
      console.log("value : ",val);
      this.categoryIdToUpdate = val['id'];
      if (this.categoryIdToUpdate) {
        this.isUpdateActive = true;
        this.categoryForm.patchValue({
          name: val["name"],
          description: val["description"]
        });
      }
    });
  }

  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (res:Array<Category>) => {
        this.categories = _.map(res, function(cat:Category) {
          return  {
            _id: cat['_id'],
            name : cat['name'],
            description: cat['description']
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Save() {
    if (_.isEmpty(this.categoryForm.value["parent_category"])) {
      delete this.categoryForm.value["parent_category"];
    }
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
      description: user.description,
    });
  }

  update() {
    delete this.categoryForm.value["parent_category"];
    this.categoryService
      .updateCategory({...this.categoryForm.value, _id: this.categoryIdToUpdate })
      .subscribe((res) => {
        this.toastr.success('Category Updated Successfully');
        this.router.navigate(['/categories']);
        this.categoryForm.reset();
      });
  }
}
