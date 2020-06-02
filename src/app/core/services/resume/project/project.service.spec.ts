import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Project } from 'src/app/core/models/candidate/project.model';

describe('projectService', () => {
    let httpTestingController: HttpTestingController;
    let projectService: ProjectService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ProjectService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        projectService = TestBed.get(ProjectService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#add', () => {
        let project = new Project();
        project.title = 'project title';
        project.description = 'this is a project\'s description ';
        const resumeID = 1;

        it('should add project', () => {
            projectService.add(project, resumeID).subscribe(
                data => {
                    expect(data['id']).toEqual(1, 'should return the id of the new project');
                    expect(data['resume']).toContain(resumeID, 'should return the resume uri of the project');
                },
                fail
            );

            const req = httpTestingController.expectOne(projectService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        project,
                        resume: '/api/resumes/'+resumeID
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#delete', () => {
        const projectID = 1;

        it('should delete the document', () => {
            projectService.delete(projectID).subscribe(
                data => expect(data['status']).toEqual(204, 'should delete project and return 204 status code'),
                fail
            );

            const req = httpTestingController.expectOne(projectService.API_URL + '/'+ projectID);
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
        let project = new Project();
        project.title = 'project title';
        project.description = 'this is a project\'s description ';
        project.id = 1;

        it('should edit project', () => {
            projectService.edit(project).subscribe(
                data => {
                    expect(data['project']).toEqual(project, 'should return the the project');
                },
                fail
            );

            const req = httpTestingController.expectOne(projectService.API_URL + '/' + project.id);
            expect(req.request.method).toEqual('PUT');

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        project
                    }
                }
            );
            req.event(expectedResponse);
        });
    })
})