import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'src/app/core/models/candidate/language.model';

@Component({
  selector: 'sp-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages: Language[];
  
  constructor() { }

  ngOnInit() {
  }

}
