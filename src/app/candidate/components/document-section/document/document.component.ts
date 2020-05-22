import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from 'src/app/core/models/candidate/document.model';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentFormComponent } from '../document-form/document-form.component';

@Component({
  selector: 'sp-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @Input() cv: Document;
  @Input() resumeID: number;
  @Input() isRecruiter: boolean = false;
  isLoading = false;
  
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  viewCv() {
    window.open('http://localhost:8000' + this.cv.url, '_blanc')
  }

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(DocumentFormComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.cv = this.cv;
    modalRef.componentInstance.resumeID = this.resumeID;
    modalRef.result.then(res => {
      this.cv = res;
    })
  }
}
