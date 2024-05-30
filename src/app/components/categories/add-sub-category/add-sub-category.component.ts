import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent {

  userId!: number;
  userDetails!: Category;
  subcategoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private categoryService: CategoryService){}

  ngOnInit(): void {
    this.subcategoryForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      id:['', Validators.required]
    });

    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchCategoryId(this.userId);
    })

this.fetchCategory();

    console.log(this.fetchCategoryId)

  }

  categories:any;

  fetchCategory(){
    this.categoryService.getCategory()
    .subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  
  fetchCategoryId(UserId: number){
    this.categoryService.getCategoryById(this.userId)
    .subscribe({
      next: (res) => {
        this.userDetails = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
