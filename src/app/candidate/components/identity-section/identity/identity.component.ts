import { Component, OnInit, Input } from '@angular/core';
import { CandidateIdentity } from 'src/app/core/models/candidate/candidate-identity.model';

@Component({
  selector: 'sp-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  @Input() identity: CandidateIdentity;
  
  constructor() { }

  ngOnInit() {
  }

}
