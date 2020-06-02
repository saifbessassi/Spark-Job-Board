import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { LanguageCandidateService } from './lang-candidate.service';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';

describe('languageCandidateService', () => {
    let httpTestingController: HttpTestingController;
    let languageCandidateService: LanguageCandidateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ LanguageCandidateService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        languageCandidateService = TestBed.get(LanguageCandidateService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        let langCandidate = new LanguageCandidate();
        langCandidate.language = 2;
        langCandidate.proficiency = 'Professional working proficiency';
        const resumeID = 1;

        it('should add candidate\'s language', () => {
            languageCandidateService.add(langCandidate, resumeID).subscribe(
                data => {
                    expect(data['id']).toEqual(1, 'should return the id of the new candidate\'s language');
                    expect(data['resume']).toContain(resumeID, 'should return the resume uri of the candidate\'s language');
                },
                fail
            );

            const req = httpTestingController.expectOne(languageCandidateService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        langCandidate,
                        resume: '/api/resumes/'+resumeID
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const langCandID = 1;

        it('should delete the candidate\'s language', () => {
            languageCandidateService.delete(langCandID).subscribe(
                data => expect(data['status']).toEqual(204, 'should delete candidate\'s language and return 204 status code'),
                fail
            );

            const req = httpTestingController.expectOne(languageCandidateService.API_URL + '/'+ langCandID);
            expect(req.request.method).toEqual('DELETE');

            const expectedResponse = new HttpResponse(
                {
                    status: 204,
                    statusText: 'No Content'
                }
            );
            req.flush(expectedResponse);

        });
    });

    describe('#edit', () => {
        let langCandidate = new LanguageCandidate();
        langCandidate.language = 2;
        langCandidate.proficiency = 'Professional working proficiency';
        langCandidate.id = 1;

        it('should edit candidate\'s language', () => {
            languageCandidateService.edit(langCandidate).subscribe(
                data => {
                    expect(data['langCandidate']).toEqual(langCandidate, 'should return the the candidate\'s language');
                },
                fail
            );

            const req = httpTestingController.expectOne(languageCandidateService.API_URL + '/' + langCandidate.id);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        langCandidate
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})