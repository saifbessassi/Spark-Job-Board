import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateService } from 'src/app/core/services/date/ngb-date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Output() filter: EventEmitter<string> = new EventEmitter();
  minStartDate: any;
  dateForm: FormGroup;
  start: string;

  constructor(
    private ngbDateService: NgbDateService
  ) {
    this.minStartDate = this.ngbDateService.dateToString(new Date('1960-01-01'));
  }

  ngOnInit() {
    this.dateForm = new FormGroup({
      'dateStart': new FormControl(null, Validators.required),
      'dateEnd': new FormControl({value: null, disable: true}),
    });

    this.dateForm.get('dateStart').valueChanges.subscribe(res => {
      this.dateForm.get('dateEnd').reset();
      if(this.dateForm.get('dateStart').invalid) {
        this.dateForm.get('dateEnd').disable();
      } else {
        this.dateForm.get('dateEnd').enable();
        this.start = res.year + '-' + res.month + '-' + res.day;
        this.filter.emit(this.start)
      }
    })

    this.dateForm.get('dateEnd').valueChanges.subscribe(res => {
      if (res) {
        const end = this.start + '/' + res.year + '-' + res.month + '-' + res.day;
        this.filter.emit(end);
      }
    })


  }

  ngOnChanges() {
    
  }



}
