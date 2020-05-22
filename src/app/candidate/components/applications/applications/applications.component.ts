import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Application } from 'src/app/core/models/candidate/application.model';
import { ApplicationService } from 'src/app/core/services/application/application.service';

@Component({
  selector: 'sp-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  @Input() candidateID: number;
  @Input() isRecruiter: boolean = false;
  applications: Application[];

  constructor(
    private candidateService: CandidateService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.candidateService.getCandidateApplications(this.candidateID).subscribe((res: Application[]) => {
      this.applications = res;
    }, err => {
      console.log(err)
    })
  }

  onDecision(status: string, id: number, index: number) {
    this.applicationService.makeDecision(status, id).subscribe( (res: Application) => {
      this.applications[index].status = status;
    });
  }

}
