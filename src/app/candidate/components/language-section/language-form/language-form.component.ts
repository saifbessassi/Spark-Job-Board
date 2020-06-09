import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';
import { LanguageCandidateService } from 'src/app/core/services/resume/lang-candidate/lang-candidate.service';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { Language } from 'src/app/core/models/language.model';

@Component({
  selector: 'sp-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  languageCandidate: LanguageCandidate;
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
    if (this.languageCandidate) {
      this.langForm.setValue({
        id: this.languageCandidate.language['id'],
        proficiency: this.languageCandidate.proficiency,
      });
    }
  }

  save() {
    this.isLoading = true;
    if (this.languageCandidate) {
      this.id = this.languageCandidate.id;
    }

    if (this.resumeID) {
      this.languageCandidate = new LanguageCandidate;
      this.languageCandidate.proficiency = this.langForm.value.proficiency;
      this.languageCandidate.language = this.langForm.value.id;
      this.langCandidateService.add(this.languageCandidate, this.resumeID).subscribe(res => {
        this.activeModal.close(res);
        this.isLoading = false;
      }, err => {
        this.errorMsg = 'An error occurred, please try again later.';
        this.isLoading = false;
      });
    } else {
      this.languageCandidate.proficiency = this.langForm.value.proficiency;
      this.languageCandidate.language = this.langForm.value.id;
      this.languageCandidate.id = this.id;
      this.langCandidateService.edit(this.languageCandidate).subscribe(res => {
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
