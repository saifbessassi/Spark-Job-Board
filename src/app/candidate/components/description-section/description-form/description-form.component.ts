import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sp-description-form',
  templateUrl: './description-form.component.html',
  styleUrls: ['./description-form.component.scss']
})
export class DescriptionFormComponent implements OnInit {

  description: string;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  save() {
    console.log(this.description)
  }

  dismissModal() {
    this._activeModal.dismiss();
  }
}
