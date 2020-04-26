import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/core/models/candidate/candidate.model';

@Component({
  selector: 'sp-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  @Input() candidate: Candidate;
  
  constructor() { }

  ngOnInit() {
  }

}
