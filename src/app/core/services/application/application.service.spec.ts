import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './application.service';
import { Application } from '../../models/candidate/application.model';
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';


describe('applicationService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let applicationService: ApplicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [ HttpClientTestingModule ],
        // Provide the service-under-test
        providers: [ ApplicationService ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        applicationService = TestBed.get(ApplicationService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    /// applicationService method tests begin ///
    describe('#getRecentApplications', () => {
        let expectedApplications: Application[];

        beforeEach(() => {
            applicationService = TestBed.get(ApplicationService);
            expectedApplications = [
                {
                    id: 1,
                    job: {
                        title: 'job 1'
                    },
                    status: 'open',
                    applicationDate: new Date('01/06/2020')
                },
                {
                    id: 1,
                    job: {
                        title: 'job 2'
                    },
                    status: 'open',
                    applicationDate: new Date('01/04/2020')
                }
            ] as Application[];
        });

        it('should return expected applications', () => {
            applicationService.getRecentApplications().subscribe(
                application => expect(application).toEqual(expectedApplications, 'should return expected applications'),
                fail
            );
            // applicationService should have made one request to GET applicationes from expected URL
            const req = httpTestingController.expectOne(applicationService.API_URL + '?order[applicationDate]=desc&itemsPerPage=5');
            expect(req.request.method).toEqual('GET');

            // Respond with the mock applicationes
            req.flush(expectedApplications);
        });

        it('should be OK returning no applications', () => {
            applicationService.getRecentApplications().subscribe(
                applications => expect(applications['hydra:member'].length).toEqual(0, 'should have no applications'),
                fail
            );

            const req = httpTestingController.expectOne(applicationService.API_URL + '?order[applicationDate]=desc&itemsPerPage=5');
            req.flush([]); // Respond with no applications
        });

        it('should turn 404 into a user-friendly error', () => {
            const msg = '404 Not Found';
            applicationService.getRecentApplications().subscribe(
                applicationes => fail('expected to fail'),
                error => expect(error.message).toContain(msg)
            );

            const req = httpTestingController.expectOne(applicationService.API_URL + '?order[applicationDate]=desc&itemsPerPage=5');

            // respond with a 404 and the error message in the body
            req.flush(msg, {status: 404, statusText: 'Not Found'});
        });
    });

    describe('#makeDecision', () => {

        it('should update an application\'s status', () => {

            const newStatus = 'open';
            const applicationID = 1;

            applicationService.makeDecision(newStatus, 1).subscribe(
                (data: Application) => expect(data.status).toEqual(newStatus, 'should return the application with updated status'),
                fail
            );

            // applicationService should have made one request to PUT application
            const req = httpTestingController.expectOne(applicationService.API_URL + '/' + applicationID);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual({status: newStatus});

            // Expect server to return the application after PUT
            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: {
                        id: applicationID,
                        job: {
                            title: 'job 1'
                        },
                        candidate: {
                            fullname: 'candidate name1'
                        },
                        status: newStatus,
                        applicationDate: new Date(),
                        message: 'this is a message'
                    }
                });
            req.event(expectedResponse);
        });

        it('should turn network error into user-facing error', () => {
            const emsg = 'simulated network error';
            const newStatus = 'open';
            const applicationID = 1;

            applicationService.makeDecision(newStatus, applicationID).subscribe(
                applicationes => fail('expected to fail'),
                error => expect(error.error.message).toEqual(emsg)
            );

            const req = httpTestingController.expectOne(applicationService.API_URL + '/' + applicationID);

            // Create mock ErrorEvent, raised when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc
            const errorEvent = new ErrorEvent('so sad', {
                message: emsg
            });

            // Respond with mock error
            req.error(errorEvent);
        });
    });

    describe('#apply', () => {

        const jobID = 1;
        const candidateID = 1;
        const message = 'this is a message for application';
        const expectedApplication = {
            id: 1,
            job: '/api/jobs/1',
            candidate: '/api/candidates/10',
            status: 'waiting',
            applicationDate: new Date(),
            message: message
        };

        it('should add a new application', () => {
            applicationService.apply(jobID, candidateID, message).subscribe(
                data => expect(data).toEqual(expectedApplication, 'should add and return the new application'),
                fail
            );

            const req = httpTestingController.expectOne(applicationService.API_URL);
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: expectedApplication
                }
            );
            req.event(expectedResponse);
        });
    });
});