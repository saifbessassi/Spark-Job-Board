import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'src/app/core/models/candidate/language.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageFormComponent } from '../language-form/language-form.component';

@Component({
  selector: 'sp-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages: Language[];
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openNewForm() {
    const modalRef = this.modalService.open(LanguageFormComponent, { centered: true, size: 'lg' });
  }

  openEditForm(lang) {
    const modalRef = this.modalService.open(LanguageFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.language = lang;
  }

}
