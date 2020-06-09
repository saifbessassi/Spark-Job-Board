import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageFormComponent } from '../language-form/language-form.component';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';
import { LanguageCandidateService } from 'src/app/core/services/resume/lang-candidate/lang-candidate.service';

@Component({
  selector: 'sp-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages: LanguageCandidate[];
  @Input() resumeID: number;
  @Input() isRecruiter = false;
  isLoading = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private langCandidateService: LanguageCandidateService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(LanguageFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.languages.push(res);
    });
  }

  openEditForm(lang, index) {
    const modalRef = this.modalService.open(LanguageFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.languageCandidate = lang;
    modalRef.componentInstance.index = index;
    modalRef.result.then(res => {
      this.languages[res.index] = res.language;
    });
  }

  delete(id: number, index: number) {
    if (confirm('Do you really want to delete this language?')) {
      this.isLoading = true;
      this.langCandidateService.delete(id).subscribe(res => {
        this.languages.splice(index, 1);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

}
