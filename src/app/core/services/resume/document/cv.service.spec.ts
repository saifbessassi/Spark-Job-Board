import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { CvService } from './cv.service';

describe('cvService', () => {
    let httpTestingController: HttpTestingController;
    let cvService: CvService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ CvService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        cvService = TestBed.get(CvService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        const file = new File([new Blob(['some content'])], 'test-file.pdf', {type: 'application/pdf'})
        const resumeID = 1;

        it('should add the file', () => {
            cvService.add(file, resumeID).subscribe(
                events => {
                    if (events.type === HttpEventType.Response) {
                        expect(events.body['id']).toEqual(1, 'should return the id of the new document');
                        expect(events.body['url']).toContain('documents', 'should return the url of the document');
                    }
                },
                fail
            );

            const req = httpTestingController.expectOne(cvService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        url: '../documents/123456789.pdf'
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const documentID = 1;

        it('should delete the document', () => {
            cvService.delete(documentID).subscribe(
                events => {
                    if (events.type === HttpEventType.Response) {
                        expect(events.status).toEqual(204, 'should return delete the document');
                    }
                },
                fail
            );

            const req = httpTestingController.expectOne(cvService.API_URL + '/'+ documentID);
            expect(req.request.method).toEqual('DELETE');

            const expectedResponse = new HttpResponse(
                {
                    status: 204,
                    statusText: 'No Content'
                }
            );
            req.event(expectedResponse);

        });
    })
})