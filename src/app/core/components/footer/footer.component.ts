import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  newsletterForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // Initialise newslettre form
    this.initNewslettreForm();
  }

  initNewslettreForm() {
    this.newsletterForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
  }

  onSubmit() {
    console.log(this.newsletterForm.value);
  }

}
