import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Category } from '../../models/job/category.model';

@Injectable({
    providedIn: 'root',
})
export class ExistCategoryValidator {
    exist(controlName: string, allCategories: Category[]) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];

            if (control.errors && !control.errors.exist) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            const categoryLabel = [];
            allCategories.forEach(element => {
                categoryLabel.push(element.label.toUpperCase());
            });
            if (categoryLabel.includes(control.value.toUpperCase())) {
                control.setErrors({exist: true});
            } else {
                control.setErrors(null);
            }
        };
    }
}
