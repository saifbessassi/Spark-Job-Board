import { NgbDateService } from "./ngb-date.service";
import { TestBed } from '@angular/core/testing';

describe('NgbDateService', () => {
    let ngbDateService: NgbDateService;
    let date;
    let objectDate;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ NgbDateService ]
        });
        ngbDateService = TestBed.get(NgbDateService);
        date = "2020-01-31";
        objectDate = {
            day: 31,
            month: 1,
            year: 2020
        };
    });

    describe('#dateToString', () => {
        it('should return date as object', () => {
            expect(ngbDateService.dateToString(date)).toEqual(objectDate);
        });
    });

    describe('#stringToDate', () => {
        it('should return date as object', () => {
            expect(ngbDateService.stringToDate(objectDate).toDateString()).toEqual(new Date(date).toDateString());
        });
    });
})