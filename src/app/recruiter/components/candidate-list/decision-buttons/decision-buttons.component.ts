import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { Application } from 'src/app/core/models/candidate/application.model';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';

@Component({
  selector: 'sp-decision-buttons',
  templateUrl: './decision-buttons.component.html',
  styleUrls: ['./decision-buttons.component.scss']
})
export class DecisionButtonsComponent implements OnInit {

  @Input() value;
  @Output() outputStatus = new EventEmitter<string>();

  constructor(
    private applicationService: ApplicationService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  onDecision(status: string) {
    const old = this.value;
    this.applicationService.makeDecision(status, this.value.id).subscribe( (res: Application) => {
      this.candidateService.changeNbCandPerStatus(status, old);
      this.outputStatus.emit(status);
    });
  }

}
