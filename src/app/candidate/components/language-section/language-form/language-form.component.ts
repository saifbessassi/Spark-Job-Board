import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCandidateRequest } from 'src/app/core/models/candidate/lang-candidate-request.model';
import { LanguageCandidateResponse } from 'src/app/core/models/candidate/lang-candidate-response.model';
import { LanguageCandidateService } from 'src/app/core/services/resume/lang-candidate/lang-candidate.service';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { Language } from 'src/app/core/models/language.model';

@Component({
  selector: 'sp-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  langRequest = new LanguageCandidateRequest();
  langResponse: LanguageCandidateResponse;
  langForm: FormGroup;
  allLang: Language[] = [];
  resumeID: number;
  index: number;
  id: number;
  errorMsg: string;
  isLoading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private langCandidateService: LanguageCandidateService,
    private langService: LanguageService
  ) { }

  ngOnInit() {
    this.langService.getAllLanguages().subscribe(res => {
      this.allLang = res;
    });
    this.initForm();
  }

  initForm() {
    this.langForm = new FormGroup({
      id: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      proficiency: new FormControl(
        null,
        [
          Validators.required
        ]
        ),
    });
    if (this.langResponse) {
      this.langForm.setValue({
        id: this.langResponse.language.id,
        proficiency: this.langResponse.proficiency,
      });
    }
  }

  save() {
    console.log(this.langForm.value);
    this.isLoading = true;
    if (this.langResponse) {
      this.id = this.langResponse.id;
    }

    this.langRequest.proficiency = this.langForm.value.proficiency;
    this.langRequest.language = this.langForm.value.id;
    if (this.resumeID) {
      this.langCandidateService.add(this.langRequest, this.resumeID).subscribe(res => {
        this.activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    } else {
      this.langRequest.id = this.id;
      this.langCandidateService.edit(this.langRequest).subscribe(res => {
        this.activeModal.close({language: res, index: this.index});
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    }
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

}
