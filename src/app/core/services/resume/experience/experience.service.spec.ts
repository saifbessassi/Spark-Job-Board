import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { ExperienceService } from './experience.service';
import { Experience } from 'src/app/core/models/candidate/experience.model';

describe('experienceService', () => {
    let httpTestingController: HttpTestingController;
    let experienceService: ExperienceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ExperienceService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        experienceService = TestBed.get(ExperienceService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        let experience = new Experience();
        experience.dateStart = new Date('12/12/2019');
        experience.dateEnd = new Date('05/05/2020');
        experience.company = 'company name';
        experience.description = 'this is an experience\'s description';
        experience.location = 'some place';
        experience.title = 'some title';
        const resumeID = 1;

        it('should add experience', () => {
            experienceService.add(experience, resumeID).subscribe(
                data => {
                    expect(data['id']).toEqual(1, 'should return the id of the new experience');
                    expect(data['resume']).toContain(resumeID, 'should return the resume uri of the experience');
                },
                fail
            );

            const req = httpTestingController.expectOne(experienceService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        experience,
                        resume: '/api/resumes/'+resumeID
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const experienceID = 1;

        it('should delete the document', () => {
            experienceService.delete(experienceID).subscribe(
                data => expect(data['status']).toEqual(204, 'should delete experience and return 204 status code'),
                fail
            );

            const req = httpTestingController.expectOne(experienceService.API_URL + '/'+ experienceID);
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
        let experience = new Experience();
        experience.dateStart = new Date('12/12/2019');
        experience.dateEnd = new Date('05/05/2020');
        experience.company = 'company name';
        experience.description = 'this is an experience\'s description';
        experience.location = 'some place';
        experience.title = 'some title';
        experience.id = 1;

        it('should edit experience', () => {
            experienceService.edit(experience).subscribe(
                data => {
                    expect(data['experience']).toEqual(experience, 'should return the the experience');
                },
                fail
            );

            const req = httpTestingController.expectOne(experienceService.API_URL + '/' + experience.id);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        experience
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})