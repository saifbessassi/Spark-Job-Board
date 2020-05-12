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
  isUploading: boolean;

  constructor(
    private _activeModal: NgbActiveModal,
    private cvService: CvService,
    config: NgbProgressbarConfig
  ) {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'primary';
    config.height = '20px';
  }

  ngOnInit() {
  }

  addCv(event) {
    this.error_msg = [];
    this.isUploading = true;
    this.uploadProgress = 0;
    this.selectedFile = <File>event.target.files[0];
    this.cvService.add(this.selectedFile, this.resumeID).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(events.loaded / events.total * 100);
      } else if (events.type === HttpEventType.Response) {
        this.cv = <Document>events.body;
        this.isUploading = false;
      }
    }, err => {
      err.error.violations.forEach(element => {
        this.error_msg.push(element.message);
      });
      this.isUploading = false;
    })
  }

  deleteCv() {
    if(confirm('Do you really want to delete your resume?')) {
      this.isUploading = true;
      this.uploadProgress = 0;
      this.cvService.delete(this.cv.id).subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(events.loaded / events.total * 100);
          console.log(this.uploadProgress)
        } else if (events.type === HttpEventType.Response) {
          this.cv = null;
          this.isUploading = false;
        }
      }, err => {
        this.error_msg.push('An error occurred, please try again later.');
        this.isUploading = false;
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
