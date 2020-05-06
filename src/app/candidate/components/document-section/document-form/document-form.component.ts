import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/core/models/candidate/document.model';
import { NgbActiveModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { CvService } from 'src/app/core/services/resume/document/cv.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'sp-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  cv: Document;
  selectedFile: File = null;
  resumeID: number;
  error_msg: string[] = [];
  isLoading = false;
  uploadProgress: number;

  constructor(
    private _activeModal: NgbActiveModal,
    private cvService: CvService,
    config: NgbProgressbarConfig
  ) {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  ngOnInit() {
  }

  addCv(event) {
    this.error_msg = [];
    this.selectedFile = <File>event.target.files[0];
    this.cvService.add(this.selectedFile, this.resumeID).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(events.loaded / events.total * 100);
      } else if (events.type === HttpEventType.Response) {
        this.cv = <Document>events.body;
      }
    }, err => {
      console.log(err)
      err.error.violations.forEach(element => {
        this.error_msg.push(element.message);
      });
      console.log(this.error_msg)
    })
  }

  deleteCv() {
    if(confirm('Do you really want to delete your resume?')) {
      this.cvService.delete(this.cv.id).subscribe(res => {
        this.cv = null;
      }, err => {
        this.error_msg.push('An error occurred, please try again later.');
      })
    }
  }

  viewCv() {
    window.open('http://localhost:8000' + this.cv.url, '_blanc')
  }

  dismissModal() {
    this._activeModal.close(this.cv);
  }

}
