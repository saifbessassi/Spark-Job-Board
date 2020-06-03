import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/job/category.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExistCategoryValidator } from 'src/app/core/services/category/existCategory.validator';

@Component({
  selector: 'sp-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  allCategories: Category[];
  categoryForm: FormGroup;
  isLoading: boolean;
  errorMsg: string;

  constructor(
    private categoryService: CategoryService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private existValidator: ExistCategoryValidator
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      label: new FormControl(null, [Validators.required])
    }, {
      validator: this.existValidator.exist('label', this.allCategories),
  });
  }

  onSubmit() {
    this.isLoading = true;
    this.categoryService.addCategory(this.categoryForm.value).subscribe(
      (res: Category) => {
        this.activeModal.close({id: res.id, label: res.label});
        this.isLoading = false;
      },
      err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      }
    );
  }

}
