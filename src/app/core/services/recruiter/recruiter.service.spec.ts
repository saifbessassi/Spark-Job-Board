import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { RecruiterService } from './recruiter.service';
import { HttpResponse } from '@angular/common/http';

describe('recruiterService', () => {
    let httpTestingController: HttpTestingController;
    let recruiterService: RecruiterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ RecruiterService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        recruiterService = TestBed.get(RecruiterService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getTotalCount', () => {
        let expectedTotalCount;

        beforeEach(() => {
            expectedTotalCount = {
                "applications": 122,
                "jobs": 24,
                "candidates": 154,
                "accepted": 44
            };
        });

        it('should return expected total counts', () => {
            recruiterService.getTotalCount().subscribe(
                data => expect(data).toEqual(expectedTotalCount, 'should return expected total counts'),
                fail
            );

            const req = httpTestingController.expectOne(recruiterService.API_URL + '/total-count');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedTotalCount);
        })
    });

    describe('#sendMail', () => {
        const newEmail = {
            subject: "test subject",
            message: "some words",
            email: "mail@mail.com"
        };

        it('should send email and return nothing', () => {
            recruiterService.sendMail(newEmail).subscribe(
                data => expect(data).toEqual({}, 'should send email and return nothing')
            )

            const req = httpTestingController.expectOne(recruiterService.API_URL + '/send-mail');
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {}
                }
            );
            req.event(expectedResponse);
        });
    });
})