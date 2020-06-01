import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { Language } from '../../models/language.model';

describe('languageService', () => {
    let httpTestingController: HttpTestingController;
    let languageService: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ LanguageService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        languageService = TestBed.get(LanguageService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getAllLanguages', () => {
        const expectedLanguages: Language[] = [
            {id: 1, label: 'lang 1'},
            {id: 2, label: 'lang 2'},
        ];

        it('should return expected categories', () => {
            languageService.getAllLanguages().subscribe(
                data => expect(data).toEqual(expectedLanguages, 'should return expected categories'),
                fail
            );

            const req = httpTestingController.expectOne(languageService.API_URL);
            expect(req.request.method).toEqual('GET');

            req.flush(expectedLanguages);
        })
    });
})