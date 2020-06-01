import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { DescriptionService } from './description.service';
import { HttpResponse } from '@angular/common/http';

describe('descriptionService', () => {
    let httpTestingController: HttpTestingController;
    let descriptionService: DescriptionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ DescriptionService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        descriptionService = TestBed.get(DescriptionService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#editDescription', () => {
        const newDescription = 'this is a new description';
        const resumeID = 1;

        it('should modify the descrption', () => {
            descriptionService.edit(newDescription, resumeID).subscribe(
                data => {
                    expect(data['description']).toEqual(newDescription, 'should return the descrption');
                },
                fail
            );

            const req = httpTestingController.expectOne(descriptionService.API_URL + '/' + resumeID);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        description: newDescription
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})