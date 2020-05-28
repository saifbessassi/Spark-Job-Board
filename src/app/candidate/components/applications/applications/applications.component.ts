import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CandidateService, NbCandPerStatus } from 'src/app/core/services/candidate/candidate.service';
import { Application } from 'src/app/core/models/candidate/application.model';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  @Input() candidateID: number;
  @Input() isRecruiter: boolean = false;
  applications: Application[];
  nbCandPerStatus: NbCandPerStatus;
  @Output() outputIsDecisionMaked = new EventEmitter<boolean>();
  message: string;

  constructor(
    private candidateService: CandidateService,
    private applicationService: ApplicationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.candidateService.currentNbCandPerStatus.subscribe(data => {
      this.nbCandPerStatus = data;
    })
    this.candidateService.getCandidateApplications(this.candidateID).subscribe((res: Application[]) => {
      this.applications = res;
    }, err => {
      console.log(err)
    })
  }

  onDecision(status: string, id: number, index: number) {
    const old = this.applications[index].status;
    this.applicationService.makeDecision(status, id).subscribe( (res: Application) => {
      this.applications[index].status = status;
      this.candidateService.changeNbCandPerStatus(status, old);
      this.outputIsDecisionMaked.emit(true);
    });
  }

  openMotivation(motivation, message) {
    this.modalService.open(motivation, {scrollable: true, size: 'md'});
    this.message = message
  }

}
