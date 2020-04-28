import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/core/models/candidate/language.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  language: Language;
  langForm: FormGroup;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.langForm = new FormGroup({
      'label': new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      'level': new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if(this.language) {
      this.langForm.setValue({
        'label': this.language.language.label,
        'level': this.language.level,
      });
    }
  }

  save() {
    console.log(this.langForm.value)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

}
