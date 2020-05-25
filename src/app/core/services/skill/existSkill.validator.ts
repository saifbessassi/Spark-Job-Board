import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { element } from 'protractor';

@Injectable({
    providedIn: 'root',
})
export class ExistValidator {
    exist(controlName: string, allSkills: Skill[]) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];

            if (control.errors && !control.errors.exist) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            let skillsLabel = [];
            allSkills.forEach(element => {
                skillsLabel.push(element.label.toUpperCase());
            })
            if (skillsLabel.includes(control.value.toUpperCase())) {
                control.setErrors({exist: true})
            } else {
                control.setErrors(null);
            }
        }
    }
}
