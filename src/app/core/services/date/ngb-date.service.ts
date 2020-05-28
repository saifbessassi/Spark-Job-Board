import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgbDateService {

    constructor() {}

    dateToString(date) {
        const d = new Date(date);
        return {
          day: d.getDate(),
          month: d.getMonth() + 1,
          year: d.getFullYear()
        };
    }

    stringToDate(date) {
        const d = date.year + '-' + date.month + '-' + date.day;
        return new Date(d);
    }
}
