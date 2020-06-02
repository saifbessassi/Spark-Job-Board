import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { SkillCandidateService } from './skill-candidate.service';
import { SkillCandidateRequest } from 'src/app/core/models/candidate/skill-candidate-request.model';

describe('skillCandidateService', () => {
    let httpTestingController: HttpTestingController;
    let skillCandidateService: SkillCandidateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ SkillCandidateService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        skillCandidateService = TestBed.get(SkillCandidateService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        let skillCandidate = new SkillCandidateRequest();
        skillCandidate.skill = 2;
        skillCandidate.proficiency = 'novice';
        const resumeID = 1;

        it('should add candidate\'s skill', () => {
            skillCandidateService.add(skillCandidate, resumeID).subscribe(
                data => {
                    expect(data['id']).toEqual(1, 'should return the id of the new candidate\'s skill');
                    expect(data['resume']).toContain(resumeID, 'should return the resume uri of the candidate\'s skill');
                },
                fail
            );

            const req = httpTestingController.expectOne(skillCandidateService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        skillCandidate,
                        resume: '/api/resumes/'+resumeID
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const skillCandID = 1;

        it('should delete the candidate\'s skill', () => {
            skillCandidateService.delete(skillCandID).subscribe(
                data => expect(data['status']).toEqual(204, 'should delete candidate\'s skill and return 204 status code'),
                fail
            );

            const req = httpTestingController.expectOne(skillCandidateService.API_URL + '/'+ skillCandID);
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
        let skillCandidate = new SkillCandidateRequest();
        skillCandidate.skill = 2;
        skillCandidate.proficiency = 'novice';
        skillCandidate.id = 1;

        it('should edit candidate\'s skill', () => {
            skillCandidateService.edit(skillCandidate).subscribe(
                data => {
                    expect(data['skillCandidate']).toEqual(skillCandidate, 'should return the the candidate\'s skill');
                },
                fail
            );

            const req = httpTestingController.expectOne(skillCandidateService.API_URL + '/' + skillCandidate.id);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        skillCandidate
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})