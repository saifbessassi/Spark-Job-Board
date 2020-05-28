import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sp-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() errorMsg: string;

  constructor() { }

  ngOnInit() {
  }

}
