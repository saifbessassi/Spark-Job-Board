import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { CandidateService, NbCandPerStatus } from './candidate.service';
import { TestBed } from '@angular/core/testing';
import { Candidate } from '../../models/candidate/candidate.model';
import { CandidateIdentity } from '../../models/candidate/candidate-identity.model';
import { HttpResponse, HttpEventType } from '@angular/common/http';

describe('candidateService', () => {
    let httpTestingController: HttpTestingController;
    let candidateService: CandidateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ CandidateService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        candidateService = TestBed.get(CandidateService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getCandidateProfile',() => {
        let expectedCandidate: Candidate = {
            phone: "23915906",
            address: "sfax, tunisia",
            id: 3435,
            email: "saif@mail.com",
            fullname: "saif bessassi",
            picture: {
                id: 119,
                url: "/profile_pictures/saif_bessassi_3435/saif_bessassi_1590772389jpg"
            },
            imageUrl: null,
            resume: {
                id: 1425,
                description: "",
                seniorityLevel: "0 to 2 years",
                experiences: [
                    {
                        id: 1731,
                        title: "saif saif edited",
                        company: "saif saif",
                        location: "saifsafi",
                        description: "saifsaifasfieswrxdctfvygbuhnij,ok;pl:m",
                        dateStart: new Date("2018-12-31"),
                        dateEnd: new Date("2019-12-31")
                    },
                    {
                        id: 1733,
                        title: "full stack developer",
                        company: "sparkit",
                        location: "sfax",
                        description: "make a job board for Spark-it using symfony and angular.gggggggggggg",
                        dateStart: new Date("2017-12-31"),
                        dateEnd: new Date("2018-12-31")
                    }
                ],
                educations: [
                    {
                        id: 1369,
                        school: "isims isims",
                        degree: "ingenieur",
                        dateStart: new Date("2012-12-31"),
                        dateEnd: new Date("2013-12-31")
                    },
                    {
                        id: 1370,
                        school: "faculté des sciences",
                        degree: "license en science informatique",
                        dateStart: new Date("2013-12-31"),
                        dateEnd: new Date("2014-12-31")
                    }
                ],
                projects: [
                    {
                        id: 1686,
                        title: "calculator ",
                        description: "calculator calculator calculator calculator "
                    }
                ],
                skillsCandidate: [
                    {
                        id: 3,
                        skill: {
                            id: 316,
                            label: "Angular"
                        },
                        proficiency: "Intermediate"
                    },
                    {
                        id: 5,
                        skill: {
                            id: 314,
                            label: "Symfony"
                        },
                        proficiency: "Intermediate"
                    }
                ],
                languagesCandidate: [
                    {
                        id: 2,
                        language: {
                            id: 114,
                            label: "English"
                        },
                        proficiency: "Professional working proficiency"
                    },
                    {
                        id: 3,
                        language: {
                            id: 116,
                            label: "French"
                        },
                        proficiency: "Professional working proficiency"
                    }
                ],
                cv: {
                    "id": 40,
                    "url": "/documents/saif_bessassi_3435/saif_bessassi_1590081174pdf",
                    "updatedAt": new Date("2020-05-21")
                }
            }
        };


        it('should return expected candidate', () => {
            candidateService.candidateID = 3435;
            candidateService.getCandidateProfile().subscribe(
                data => expect(data).toEqual(expectedCandidate, 'should return expected candidate'),
                fail
            );
            
            const req = httpTestingController.expectOne(candidateService.API_URL_CANDIDATE + '/3435.json');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedCandidate);
        });
    });

    describe('#getCandidateProfileByID',() => {
        let expectedCandidate: Candidate;

        beforeEach(() => {
            candidateService = TestBed.get(CandidateService);
            expectedCandidate = {
                phone: "23915906",
                address: "sfax, tunisia",
                id: 3435,
                email: "saif@mail.com",
                fullname: "saif bessassi",
                picture: {
                    id: 119,
                    url: "/profile_pictures/saif_bessassi_3435/saif_bessassi_1590772389jpg"
                },
                imageUrl: null,
                resume: {
                    id: 1425,
                    description: "",
                    seniorityLevel: "0 to 2 years",
                    experiences: [
                        {
                            id: 1731,
                            title: "saif saif edited",
                            company: "saif saif",
                            location: "saifsafi",
                            description: "saifsaifasfieswrxdctfvygbuhnij,ok;pl:m",
                            dateStart: new Date("2018-12-31"),
                            dateEnd: new Date("2019-12-31")
                        },
                        {
                            id: 1733,
                            title: "full stack developer",
                            company: "sparkit",
                            location: "sfax",
                            description: "make a job board for Spark-it using symfony and angular.gggggggggggg",
                            dateStart: new Date("2017-12-31"),
                            dateEnd: new Date("2018-12-31")
                        }
                    ],
                    educations: [
                        {
                            id: 1369,
                            school: "isims isims",
                            degree: "ingenieur",
                            dateStart: new Date("2012-12-31"),
                            dateEnd: new Date("2013-12-31")
                        },
                        {
                            id: 1370,
                            school: "faculté des sciences",
                            degree: "license en science informatique",
                            dateStart: new Date("2013-12-31"),
                            dateEnd: new Date("2014-12-31")
                        }
                    ],
                    projects: [
                        {
                            id: 1686,
                            title: "calculator ",
                            description: "calculator calculator calculator calculator "
                        }
                    ],
                    skillsCandidate: [
                        {
                            id: 3,
                            skill: {
                                id: 316,
                                label: "Angular"
                            },
                            proficiency: "Intermediate"
                        },
                        {
                            id: 5,
                            skill: {
                                id: 314,
                                label: "Symfony"
                            },
                            proficiency: "Intermediate"
                        }
                    ],
                    languagesCandidate: [
                        {
                            id: 2,
                            language: {
                                id: 114,
                                label: "English"
                            },
                            proficiency: "Professional working proficiency"
                        },
                        {
                            id: 3,
                            language: {
                                id: 116,
                                label: "French"
                            },
                            proficiency: "Professional working proficiency"
                        }
                    ],
                    cv: {
                        "id": 40,
                        "url": "/documents/saif_bessassi_3435/saif_bessassi_1590081174pdf",
                        "updatedAt": new Date("2020-05-21")
                    }
                }
            };
        })


        it('should return expected candidate', () => {
            candidateService.getCandidateProfileByID(3435).subscribe(
                data => expect(data).toEqual(expectedCandidate, 'should return expected candidate'),
                fail
            );
            
            const req = httpTestingController.expectOne(candidateService.API_URL_CANDIDATE + '/3435.json');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedCandidate);
        });


        it('should turn 404 into a user-friendly error', () => {
            const msg = '404 Not Found';
            candidateService.getCandidateProfileByID(111).subscribe(
                applicationes => fail('expected to fail'),
                error => expect(error.message).toContain(msg)
            );

            const req = httpTestingController.expectOne(candidateService.API_URL_CANDIDATE + '/111.json');

            req.flush(msg, {status: 404, statusText: 'Not Found'});
        });
    });

    describe('#getCandidateApplications',() => {
        let expectedApplication;

        beforeEach(() => {
            candidateService = TestBed.get(CandidateService);
            expectedApplication = [
                {
                    id: 518,
                    job: {
                        title: "Transportation Equipment Painters",
                        location: "sfax"
                    },
                    candidate: {
                        address: "sfax, tunisia",
                        resume: {
                            seniorityLevel: "0 to 2 years",
                            skillsCandidate: [
                                {
                                    skill: {
                                        label: "Angular"
                                    }
                                },
                                {
                                    skill: {
                                        label: "Symfony"
                                    }
                                },
                                {
                                    skill: {
                                        label: "SQL"
                                    }
                                }
                            ]
                        },
                        id: 3435,
                        email: "saif2@mail.com",
                        fullname: "saif bessassi"
                    },
                    status: "rejected",
                    applicationDate: new Date("1999-04-29"),
                    message: null
                },
                {
                    id: 519,
                    job: {
                        title: "Licensed Practical Nurse",
                        location: "tunis"
                    },
                    candidate: {
                        address: "sfax, tunisia",
                        resume: {
                            seniorityLevel: "0 to 2 years",
                            skillsCandidate: [
                                {
                                    skill: {
                                        label: "Angular"
                                    }
                                },
                                {
                                    skill: {
                                        label: "Symfony"
                                    }
                                },
                                {
                                    skill: {
                                        label: "SQL"
                                    }
                                }
                            ]
                        },
                        id: 3435,
                        email: "saif2@mail.com",
                        fullname: "saif bessassi"
                    },
                    status: "waiting",
                    applicationDate: new Date("2020-04-29"),
                    message: null
                }
            ];
        })


        it('should return expected candidate\'s applications', () => {
            candidateService.getCandidateApplications(3435).subscribe(
                data => expect(data).toEqual(expectedApplication, 'should return expected candidate\'s applications'),
                fail
            );
            
            const req = httpTestingController.expectOne(candidateService.API_URL + '/api/job_applications.json?candidate.id=3435');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedApplication);
        });

        it('should be OK returning no candidate\'s applications', () => {
            candidateService.getCandidateApplications(3435).subscribe(
              data => expect(Object.keys(data).length).toEqual(0, 'should have empty candidate\'s applications array'),
              fail
            );
      
            const req = httpTestingController.expectOne(candidateService.API_URL + '/api/job_applications.json?candidate.id=3435');
            req.flush([]);
          });
    });

    describe('#edit', () => {
        it('should update an candidate identity', () => {

            const candidateID = 222;
            const identity: CandidateIdentity = {
                fullname: 'saif bessassi',
                address: 'sfax, tunisia',
                email: 'saif@mail.com',
                phone: '12345678',
                picture: {
                    id: 321,
                    url: '/profile_pictures/51843514.jpeg'
                },
                resume: {
                    id: '/api/resumes/123',
                    seniorityLevel: '0 to 2 years'
                }
            };
            candidateService.candidateID = candidateID;
            candidateService.edit(identity).subscribe(
                data => expect(data).toEqual(identity, 'should return the candidate\'s identity'),
                fail
            );

            const req = httpTestingController.expectOne(candidateService.API_URL_CANDIDATE + '/' + candidateID);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(identity);

            const expectedResponse = new HttpResponse(
                {
                    status: 200,
                    statusText: 'OK',
                    body: identity
                });
            req.event(expectedResponse);
        });
    });

    describe('#addPicture', () => {
        const file = new File([new Blob(['some content'])], 'test-picture.jpeg', {type: 'image/jpg'})
        const userID = 1;

        it('should add the picture', () => {
            candidateService.candidateID = userID;
            candidateService.addPicture(file).subscribe(
                events => {
                    if (events.type === HttpEventType.Response) {
                        expect(events.body['id']).toEqual(1, 'should return the id of the new picture');
                        expect(events.body['url']).toContain('profile_pictures', 'should return the url of the picture');
                    }
                },
                fail
            );

            const req = httpTestingController.expectOne(candidateService.API_URL + '/api/pictures');
            expect(req.request.method).toEqual('POST');

            const expectedResponse = new HttpResponse(
                {
                    status: 201,
                    statusText: 'Created',
                    body: {
                        id: 1,
                        url: '../profile_pictures/123456789.pdf'
                    }
                }
            );
            req.event(expectedResponse);
        });
    });

    describe('#deletePicture', () => {
        const pictureID = 1;

        it('should delete the picture', () => {
            candidateService.deletePicture(pictureID).subscribe(
                events => {
                    if (events.type === HttpEventType.Response) {
                        expect(events.status).toEqual(204, 'should return delete the picture');
                    }
                },
                fail
            );

            const req = httpTestingController.expectOne(candidateService.API_URL + '/api/pictures/'+ pictureID);
            expect(req.request.method).toEqual('DELETE');

            const expectedResponse = new HttpResponse(
                {
                    status: 204,
                    statusText: 'No Content'
                }
            );
            req.event(expectedResponse);

        });
    });

    describe('#getCandidateProfile',() => {
        let expectedNbCandPerStatus: NbCandPerStatus = {
            total: 154,
            applied: 81,
            unapplied: 73,
            accepted: 37,
            rejected: 33,
            waiting: 31
        };


        it('should return expected numbers', () => {
            candidateService.getNbCandidate().subscribe(
                data => expect(data).toEqual(expectedNbCandPerStatus, 'should return expected numbers'),
                fail
            );
            
            const req = httpTestingController.expectOne(candidateService.API_URL_CANDIDATE + '/count');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedNbCandPerStatus);
        });
    });

    describe('changeNbCandPerStatus', () => {
        beforeEach(() => {
            const expectedNbCandPerStatus: NbCandPerStatus = {
                accepted: 1,
                rejected: 2,
                waiting: 3,
                applied: 0,
                unapplied: 0,
                total: 6
            };
            candidateService.setNbCandPerStatus(expectedNbCandPerStatus);
        });

        it('should change rejected to accepted', () => {
            candidateService.changeNbCandPerStatus('accepted', 'rejected');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.accepted).toEqual(2);
                    expect(data.rejected).toEqual(1);
                }
            )
        });
        it('should change waiting to accepted', () => {
            candidateService.changeNbCandPerStatus('accepted', 'waiting');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.accepted).toEqual(2);
                    expect(data.rejected).toEqual(2);
                }
            )
        });

        it('should change accepted to rejected', () => {
            candidateService.changeNbCandPerStatus('rejected', 'accepted');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.rejected).toEqual(3);
                    expect(data.accepted).toEqual(0);
                }
            )
        });
        it('should change waiting to rejected', () => {
            candidateService.changeNbCandPerStatus('rejected', 'waiting');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.rejected).toEqual(3);
                    expect(data.waiting).toEqual(2);
                }
            )
        });

        it('should change accepted to waiting', () => {
            candidateService.changeNbCandPerStatus('waiting', 'accepted');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.waiting).toEqual(4);
                    expect(data.accepted).toEqual(0);
                }
            )
        });
        it('should change waiting to waiting', () => {
            candidateService.changeNbCandPerStatus('waiting', 'rejected');
            candidateService.currentNbCandPerStatus.subscribe(
                data => {
                    expect(data.rejected).toEqual(1);
                    expect(data.waiting).toEqual(4);
                }
            )
        });
    })
});