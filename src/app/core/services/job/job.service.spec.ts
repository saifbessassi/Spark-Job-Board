import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Job } from '../../models/job';
import { HttpResponse } from '@angular/common/http';

describe('JobService', () => {
  let httpTestingController: HttpTestingController;
  let jobService: JobService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ JobService ]
      });

      httpTestingController = TestBed.get(HttpTestingController);
      jobService = TestBed.get(JobService);
  });

  afterEach(() => {
      httpTestingController.verify();
  });

  describe('#getNbJobsPerCategory', () => {
    let expectedNbJobs = {
      'Sales and Marketing': 4,
      'Computer Programing': 6,
      'Design And Multimedia': 7,
      'Web Development': 7,
      'test category': 0,
      'java': 0
    };

    it('should return expected numbers of jobs', () => {
        jobService.getNbJobsPerCategory().subscribe(
            data => expect(data).toEqual(expectedNbJobs, 'should return expected numbers of jobs'),
            fail
        );
        const req = httpTestingController.expectOne(jobService.API_URL + '/nb-per-category');
        expect(req.request.method).toEqual('GET');

        req.flush(expectedNbJobs);
    });

    it('should return expected numbers of open jobs', () => {
      jobService.getNbJobsPerCategory(true).subscribe(
          data => expect(data).toEqual(expectedNbJobs, 'should return expected numbers of jobs'),
          fail
      );
      const req = httpTestingController.expectOne(jobService.API_URL + '/nb-per-category?open=true');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedNbJobs);
    });
  });

  describe('#getNbJobsPerStatus', () => {
    let expectedNbJobs = {
      'closed': 22,
      'open': 2,
      'saved': 5
    };

    it('should return expected numbers of jobs', () => {
        jobService.getNbJobsPerStatus().subscribe(
            data => expect(data).toEqual(expectedNbJobs, 'should return expected numbers of jobs'),
            fail
        );
        const req = httpTestingController.expectOne(jobService.API_URL + '/nb-per-status');
        expect(req.request.method).toEqual('GET');

        req.flush(expectedNbJobs);
    });
  });

  describe('#getNbApplicationPerStatus', () => {
    const jobID = 1;
    const expectedNbApplications = {
      'accepted': 1,
      'rejected': 4,
      'waiting': 3,
      'total': 8
    };

    it('should return expected numbers of applications', () => {
        jobService.getNbApplicationPerStatus(jobID).subscribe(
            data => expect(data).toEqual(expectedNbApplications, 'should return expected numbers of applications'),
            fail
        );
        const req = httpTestingController.expectOne(jobService.API_URL + '/nb-applications/' + jobID);
        expect(req.request.method).toEqual('GET');

        req.flush(expectedNbApplications);
    });
  });

  describe('#getFilterOptions', () => {
    const expectedOptions = {
      'categories': [
        {
            'label': 'Design And Multimedia',
            'count': '1'
        },
        {
            'label': 'Web Development',
            'count': '1'
        }
      ],
      'skills': [
          {
              'label': 'AI',
              'count': '0'
          },
          {
              'label': 'Angular',
              'count': '1'
          },
          {
              'label': 'C/C++',
              'count': '0'
          },
      ],
      'experiences': [
          {
              'label': '10 years or more',
              'count': '1'
          },
          {
              'label': '6 to 9 years',
              'count': '1'
          }
      ],
      'types': [
          {
              'label': 'Volunteer',
              'count': '2'
          }
      ],
      'locations': [
          {
              'label': 'tunis',
              'count': '2'
          }
      ]
    };

    it('should return expected numbers of applications', () => {
        jobService.getFilterOptions().subscribe(
            data => expect(data).toEqual(expectedOptions, 'should return expected numbers of applications'),
            fail
        );
        const req = httpTestingController.expectOne(jobService.API_URL + '/filter-options');
        expect(req.request.method).toEqual('GET');

        req.flush(expectedOptions);
    });
  });

  describe('#getOneJob', () => {
    const jobID = 5090;
    const expectedJob: Job = {
      'id': jobID,
      'title': 'saif saif saif3',
      'location': 'tunis',
      'description': 'this is a description',
      'employmentType': 'Volunteer',
      'seniorityLevel': '6 to 9 years',
      'status': 'open',
      'skills': [
        {
            'id': 315,
            'label': 'Laravel'
        },
        {
            'id': 318,
            'label': 'VueJs'
        }
      ],
      'category': {
        'id': 19,
        'label': 'Design And Multimedia'
      },
      'deadline': new Date('2020-06-04T00:00:00+00:00'),
      'createdAt': new Date('2020-05-12T16:42:44+00:00'),
      'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
      'createdBy': 'recruiter one',
      'updatedBy': 'recruiter one'
    }

    it('should return expected job', () => {
      jobService.getOneJob(jobID).subscribe(
          data => expect(data).toEqual(expectedJob, 'should return expected job'),
          fail
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '/' + jobID + '.json');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedJob);
    });

    it('should return 404 error', () => {
      const msg = 'Not Found';
      jobService.getOneJob(1).subscribe(
          applicationes => fail('expected to fail'),
          error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '/1.json');

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#addNewJob', () => {
    let job = new Job();
    job.title = 'job num 1';
    job.employmentType = 'fulltime';
    job.seniorityLevel = '0 to 2 years';
    job.location = 'sfax';
    job.skills = [1, 2, 3];
    job.category = 1;
    job.description = 'this is a description';
    job.deadline = new Date(); 

    it('should add job', () => {
        jobService.addNewJob(job).subscribe(
            data => {
                expect(data['id']).toEqual(1, 'should return the id of the new job');
                expect(data['status']).toEqual('open', 'should return the status of the new job');
                expect(data['job']).toEqual(job, 'should return the new job');
            },
            fail
        );

        const req = httpTestingController.expectOne(jobService.API_URL);
        expect(req.request.method).toEqual('POST');

        const expectedResponse = new HttpResponse(
            {
                status: 201,
                statusText: 'Created',
                body: {
                    id: 1,
                    status: 'open',
                    job
                }
            }
        );
        req.event(expectedResponse);
    });
  });

  describe('#editJob', () => {
    const jobID = 1;
    let job = new Job();
    job.id = jobID;
    job.title = 'job num 1';
    job.employmentType = 'fulltime';
    job.seniorityLevel = '0 to 2 years';
    job.location = 'sfax';
    job.skills = [1, 2, 3];
    job.category = 1;
    job.description = 'this is a description';
    job.deadline = new Date(); 

    it('should edit job', () => {
        jobService.editJob(job, jobID).subscribe(
            data => {
                expect(data['job']).toEqual(job, 'should return the edited job');
            },
            fail
        );

        const req = httpTestingController.expectOne(jobService.API_URL + '/' + jobID);
        expect(req.request.method).toEqual('PUT');

        const expectedResponse = new HttpResponse(
            {
                status: 200,
                statusText: 'OK',
                body: {
                    job
                }
            }
        );
        req.event(expectedResponse);
    });
  });

  describe('#dleteJob', () => {
    const jobID = 1;

    it('should delete the job', () => {
        jobService.deleteJob(jobID).subscribe(
            data => expect(data['status']).toEqual(204, 'should delete job and return 204 status code'),
            fail
        );

        const req = httpTestingController.expectOne(jobService.API_URL + '/'+ jobID);
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

  describe('#editJobStatus', () => {
    const jobID = 1;
    let job = new Job();
    job.id = jobID;
    job.title = 'job num 1';
    job.employmentType = 'fulltime';
    job.seniorityLevel = '0 to 2 years';
    job.location = 'sfax';
    job.skills = [1, 2, 3];
    job.category = 1;
    job.description = 'this is a description';
    job.status = 'closed';
    job.deadline = new Date();

    it('should edit job\'s deadline with status', () => {
      const status = 'open';
      const deadline = new Date();

      jobService.editJobStatus(jobID, status, deadline).subscribe(
        data => {
          expect(data['job'].status).toEqual(status, 'should edit status');
          expect(data['job'].deadline).toEqual(deadline, 'should edit deadline');
        },
        fail
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '/'+ jobID);
      expect(req.request.method).toEqual('PUT');

      job.status = status;
      job.deadline = deadline;
      const expectedResponse = new HttpResponse(
        {
            status: 200,
            statusText: 'OK',
            body: {
                job
            }
        }
      );
      req.event(expectedResponse);
    })
  });

  describe('#getRecentOpenJobs', () => {
    let expectedJobs: Job[] = [
      {
        'id': 1,
        'title': 'saif saif saif3',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'open',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      },
      {
        'id': 2,
        'title': 'job 2',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'open',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      }
    ];

    beforeEach(() => {
      spyOn(jobService, 'todayDate').and.returnValue('05-03-2020');
    });

    it('should return expected jobs', () => {
      jobService.getRecentOpenJobs().subscribe(
          data => expect(data).toEqual(expectedJobs, 'should return expected jobs'),
          fail
      );
      
      const req = httpTestingController.expectOne(jobService.API_URL + '.json?status=open&deadline[after]=05-03-2020&order[createdAt]=desc&itemsPerPage=5');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedJobs);
    });

    it('should be OK returning no jobs', () => {
      jobService.getRecentOpenJobs().subscribe(
          (data: any) => expect(data.length).toEqual(0, 'should have no jobs'),
          fail
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '.json?status=open&deadline[after]=05-03-2020&order[createdAt]=desc&itemsPerPage=5');
      req.flush([]);
    });
  });

  describe('#getRecentJobs', () => {
    let expectedJobs: Job[] = [
      {
        'id': 1,
        'title': 'saif saif saif3',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'open',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      },
      {
        'id': 2,
        'title': 'job 2',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'closed',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      }
    ];

    it('should return expected jobs', () => {
      jobService.getRecentJobs().subscribe(
          data => expect(data).toEqual(expectedJobs, 'should return expected jobs'),
          fail
      );
      
      const req = httpTestingController.expectOne(jobService.API_URL + '?order[createdAt]=desc&itemsPerPage=5');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedJobs);
    });

    it('should be OK returning no jobs', () => {
      jobService.getRecentJobs().subscribe(
          (data: any) => expect(data.length).toEqual(0, 'should have no jobs'),
          fail
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '?order[createdAt]=desc&itemsPerPage=5');
      req.flush([]);
    });
  });

  describe('#getCandidateJobs', () => {
    const option = [
      {
        key: 'location',
        value: 'sfax'
      }
    ];
    const pageNb = 1;
    const order = 'order[createdAt]=desc';
    let expectedJobs: Job[] = [
      {
        'id': 1,
        'title': 'saif saif saif3',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'open',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      },
      {
        'id': 2,
        'title': 'job 2',
        'location': 'tunis',
        'description': 'this is a description',
        'employmentType': 'Volunteer',
        'seniorityLevel': '6 to 9 years',
        'status': 'open',
        'skills': [
          {
              'id': 315,
              'label': 'Laravel'
          },
          {
              'id': 318,
              'label': 'VueJs'
          }
        ],
        'category': {
          'id': 19,
          'label': 'Design And Multimedia'
        },
        'deadline': new Date('2020-06-04T00:00:00+00:00'),
        'createdAt': new Date('2020-05-12T16:42:44+00:00'),
        'updatedAt': new Date('2020-05-28T15:37:26+00:00'),
        'createdBy': 'recruiter one',
        'updatedBy': 'recruiter one'
      }
    ];

    beforeEach(() => {
      spyOn(jobService, 'todayDate').and.returnValue('05-03-2020');
    });

    it('should return expected jobs', () => {
      jobService.getCandidateJobs(option, pageNb, order).subscribe(
          data => expect(data).toEqual(expectedJobs, 'should return expected jobs'),
          fail
      );
      
      const req = httpTestingController.expectOne(jobService.API_URL + '?status=open&deadline[before]=05-03-2020&location[]=sfax&order[createdAt]=desc&_page=1');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedJobs);
    });

    it('should be OK returning no jobs', () => {
      jobService.getCandidateJobs(option, pageNb, order).subscribe(
          (data: any) => expect(data.length).toEqual(0, 'should have no jobs'),
          fail
      );

      const req = httpTestingController.expectOne(jobService.API_URL + '?status=open&deadline[before]=05-03-2020&location[]=sfax&order[createdAt]=desc&_page=1');
      req.flush([]);
    });
  });
});
