import { Component, OnInit, Input } from '@angular/core';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdentityFormComponent } from '../identity-form/identity-form.component';

@Component({
  selector: 'sp-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  @Input() identity: CandidateIdentity;
  @Input() isRecruiter = false;
  isLoading = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openEditForm() {
    const modalRef = this.modalService.open(IdentityFormComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.identity = this.identity;
    modalRef.result.then(res => {
      this.identity = res;
    });
  }

}
