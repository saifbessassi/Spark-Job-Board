import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { EducationService } from './education.service';
import { Education } from 'src/app/core/models/candidate/education.model';

describe('educationService', () => {
    let httpTestingController: HttpTestingController;
    let educationService: EducationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ EducationService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        educationService = TestBed.get(EducationService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        let education = new Education();
        education.dateStart = new Date('12/12/2019');
        education.dateEnd = new Date('05/05/2020');
        education.school = 'school name';
        education.degree = 'some degree';
        const resumeID = 1;

        it('should add education', () => {
            educationService.add(education, resumeID).subscribe(
                data => {
                    expect(data['id']).toEqual(1, 'should return the id of the new education');
                    expect(data['resume']).toContain(resumeID, 'should return the resume uri of the education');
                },
                fail
            );

            const req = httpTestingController.expectOne(educationService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        education,
                        resume: '/api/resumes/'+resumeID
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const educationID = 1;

        it('should delete the document', () => {
            educationService.delete(educationID).subscribe(
                data => expect(data['status']).toEqual(204, 'should delete education and return 204 status code'),
                fail
            );

            const req = httpTestingController.expectOne(educationService.API_URL + '/'+ educationID);
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
        let education = new Education();
        education.dateStart = new Date('12/12/2019');
        education.dateEnd = new Date('05/05/2020');
        education.school = 'school name';
        education.degree = 'some degree';
        education.id = 1;

        it('should edit education', () => {
            educationService.edit(education).subscribe(
                data => {
                    expect(data['education']).toEqual(education, 'should return the the education');
                },
                fail
            );

            const req = httpTestingController.expectOne(educationService.API_URL + '/' + education.id);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        education
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})