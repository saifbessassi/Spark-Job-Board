import { HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SkillService } from './skill.service';
import { Skill } from '../../models/skill.model';

describe('skillService', () => {
    let httpTestingController: HttpTestingController;
    let skillService: SkillService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ SkillService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        skillService = TestBed.get(SkillService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getAllSkills', () => {
        const expectedSkills: Skill[] = [
            {id: 1, label: 'skill 1'},
            {id: 2, label: 'skill 2'},
        ];

        it('should return expected skills', () => {
            skillService.getAllSkills().subscribe(
                data => expect(data).toEqual(expectedSkills, 'should return expected skills'),
                fail
            );

            const req = httpTestingController.expectOne(skillService.API_URL);
            expect(req.request.method).toEqual('GET');

            req.flush(expectedSkills);
        })
    });

    describe('#addSkill', () => {
        const newSkill = {
            label: 'skill 1'
        };

        it('should add and return a new skill', () => {
            skillService.addSkill(newSkill).subscribe(
                data => {
                    expect(data['label']).toEqual(newSkill.label, 'should return the skill\'s label');
                    expect(data['id']).toEqual(1, 'should return the skill\'s id');
                },
                fail
            );

            const req = httpTestingController.expectOne(skillService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        label: 'skill 1',
                        createdAt: new Date()
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
});