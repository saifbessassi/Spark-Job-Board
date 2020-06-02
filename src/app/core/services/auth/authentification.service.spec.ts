import { TestBed, flush, fakeAsync } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../../models/user.service';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthenticationService ]
      });

      httpTestingController = TestBed.get(HttpTestingController);
      authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    localStorage.clear();
    httpTestingController.verify();
  });

  describe('#getAppliedJobs', () => {
    const candidateID = 1;
    const expectedAppliedJobs = {
      jobs: [1, 5, 48]
    };

    it('should return expected applied jobs', () => {
      authenticationService.getAppliedJobs(candidateID).subscribe(
        data => expect(data).toEqual(expectedAppliedJobs, 'should return expected applied jobs'),
        fail
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/job_applications/applied?id=' + candidateID);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock applicationes
      req.flush(expectedAppliedJobs);
    });

    it('should be OK returning no applied jobs', () => {
      authenticationService.getAppliedJobs(candidateID).subscribe(
          data => expect(Object.keys(data).length).toEqual(0, 'should have no applied jobs'),
          fail
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/job_applications/applied?id=' + candidateID);
      req.flush([]);
  });
  });

  describe('#handleAuthentication', () => {
    let spy: any;

    it('should handle candidate authentication', () => {
      const signinResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMDY4MjUsImV4cCI6MTU5MTEwNzcyNSwicm9sZXMiOlsiUk9MRV9DQU5ESURBVEUiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJzYWlmMkBtYWlsLmNvbSIsImZ1bGxuYW1lIjoic2FpZiBiZXNzYXNzaSIsInBpY3R1cmUiOiJcL3Byb2ZpbGVfcGljdHVyZXNcL3NhaWZfYmVzc2Fzc2lfMzQzNVwvc2FpZl9iZXNzYXNzaV8xNTkwNzcyMzg5anBnIiwiaWQiOjM0MzV9.lWvX3wiO6Y_nBfYZFIMH20sJGDys9PnNmWpXOPpyR1e7b7bkDfqCtHOmahQHuUSk7qiPzBdIc-zZqadfUjXBmOi5FBHoIpASV3IXq_w4J6Sl8bqksw5CWT1WgS7-_lbBMzJlPsTix4KQ4TPUs-xosVtsNqmjR3V1VbPLxdzfv-Tmo2y8hUsgss3MYrU9pd6UlOn3UX_3CXhC2W1AA79YNYUwunL45XUApJvva7ihOZersEYd5IMekDHBxLCA49E3L0jP4UuOUzuYRjALM5rNFzVk38Z1TaKJfwDpxt6CIFCtKl5WK3kmPp5FejitF5nvKNTE_kPcg6CGdREhqAp1KHSNoeAvbHBCro7pqb-XqMc2CDuITdRQKOaMQ6KG-H-Jtf8nLkXXvkJArMGSMmG7oUd0fjkuLwkXuZ0oBW6FNBSCGGMJY61P-ZcUx7PMJpOH2scHbNFZ-iS4HEO_GO4RErxYwAGgcLLJL6RmUMFRUssuh2iPlwH9QU7Utvv1__wHp6VNlaxKZUOvzhdk7CF29CKS1S8SdFH1iGZAVZRof7Ip-DYHNRmUBXmppqduu3Y6CmscilcmI7-Z38TEjyKJIzUlYwCeOWrCAG9Y26edosHq3s86EQ_--C2PdRznGbKRa1QUHf8n77ZgMVylfh4CpKMZV8iAN8csUGqz6kn2cmA",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };
      spy = spyOn(authenticationService, 'getAppliedJobs').and.returnValue(of({jobs: [5097, 5105, 5109]}));

      authenticationService.handleAuthentication(signinResponse);
      expect(JSON.parse(localStorage.getItem('token')).access_token).toEqual(signinResponse.token, 'should add access token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).refrech_token).toEqual(signinResponse.refresh_token, 'should add refresh token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).exp).not.toBeNull('should add exp token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).iat).not.toBeNull('should add iat token to local storage');

      expect(JSON.parse(localStorage.getItem('currentUser'))).not.toBeNull('should add current user to local storage');
      expect(JSON.parse(localStorage.getItem('currentUser')).appliedJobs).toBeTruthy('should add apllied jobs to current user');

      expect(authenticationService.currentUserValue).not.toBeNull('should connect candidate');
    });

    it('should handle recruiter authentication', () => {
      const signinResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMDc1MzIsImV4cCI6MTU5MTEwODQzMiwicm9sZXMiOlsiUk9MRV9SRUNSVUlURVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJyZWNydWl0ZXJAcmVjcnVpdGVyLmNvbSIsImZ1bGxuYW1lIjoicmVjcnVpdGVyIG9uZSIsImlkIjozNDIyfQ.c5Bcn3ZPFABZXIQK5Sfqh8sGtEoHfOqR0niRJRy--5TGBYHtdlyCjbULS3rsk5iCOs3sCbOyWRD3gNErfalF6bxZInewThT1-NrLrAMmeVRis9hV9F8BN6XvM19liqMpVcvKuFGmJLtsTELbAkAVdjLntRIBNjxuqJFeR8PaF5tP2PNMcSfhBL4pbdPmB4gY9Vgr4DHQgaBMHg78Vr7qURTUQ-1RkxG9XyRwYjliZo0dfPDtSlynIe68ckRtZx9ps02p81XsPztIEmTRn2zvKlQUvyfqIngNF2M9-3ivLCOux7wU49RQZ7ML8pn08k9aze1Mo2SyY0_04E0rZUr9lUCIKpbR1UMiwoAgvNdWFp8LVafGbSbBTyNw1nEGTOD6Lq-tzY0oKO8v79DMLgCSnfcBe05pyabThBX_xMhluz-XgVZF_Dp42PfX7ZcPkdxj6G9X92dxejbrseqJcMn037A6C0aiL9A7sLtUypNF_FVvKA4uKjtWtizKLNnjGgDr4nrYDxVcLvWeSWqKSOtOO3qp0g8HKTA_N7kxJBQ88sajVpY5eYxmaPic8CQUCYBgcnb_M2lcMrovA6J7eIHZWRYwoQdGs-H_U8tKb_Fx-JwRGorIE-Qtb3Gqr3CPuel12KoNk9vpkawqBZEaLIync0fP2HhMKmIaA2ciFxlXxV8",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };

      authenticationService.handleAuthentication(signinResponse);
      expect(JSON.parse(localStorage.getItem('token')).access_token).toEqual(signinResponse.token, 'should add access token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).refrech_token).toEqual(signinResponse.refresh_token, 'should add refresh token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).exp).not.toBeNull('should add exp token to local storage');
      expect(JSON.parse(localStorage.getItem('token')).iat).not.toBeNull('should add iat token to local storage');

      expect(JSON.parse(localStorage.getItem('currentUser'))).not.toBeNull('should add current user to local storage');

      expect(authenticationService.currentUserValue).not.toBeNull('should connect recruiter');
    });
  });

  describe('#logout', () => {
    it('should logout the user', () => {
      localStorage.setItem('currentUser', 'this is current user');
      localStorage.setItem('token', 'this is a token');
      authenticationService.logout();
      expect(authenticationService.currentUserValue).toEqual(null, 'should logout the user');
      expect(localStorage.getItem('currentUser')).toBeNull('should delete current user from local storage');
      expect(localStorage.getItem('token')).toBeNull('should delete token from local storage');
    })
  });

  describe('#signup', () => {
    const candidate = {
      email: 'mail@mail.com',
      fullname: 'user user',
      password: '12345678',
      retypedPassword: '12345678'
    };

    it('should signup the candidate', () => {
      authenticationService.signup(candidate).subscribe(
        data => expect(Object.keys(data)).toContain('id', 'should return candidate id'),
        fail
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/candidates');
      expect(req.request.method).toEqual('POST');
      const expectedResponse = {
        id: 1,
        email: 'mail@mail.com',
        fullname: 'user user',
      };

      req.flush(expectedResponse);
    });

    it('should return error when email already used', () => {
      const msg = 'This value is already used.';
      authenticationService.signup(candidate).subscribe(
          data => fail('expected to fail'),
          error => expect(error.error.detail).toContain(msg)
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/candidates');
      const expectedResponse = {
        "type": "https://tools.ietf.org/html/rfc2616#section-10",
        "title": "An error occurred",
        "detail": "email: This value is already used.",
        "violations": [
            {
                "propertyPath": "email",
                "message": "This value is already used."
            }
        ]
      };
      req.flush(expectedResponse, {status: 400, statusText: 'Bad request'});
  });
  });

  describe('#updatePicture', () => {
    it('should update picture', () => {
      const pictureURL = '../profile_pictures/541181428.jpg';
      const signinResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMDY4MjUsImV4cCI6MTU5MTEwNzcyNSwicm9sZXMiOlsiUk9MRV9DQU5ESURBVEUiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJzYWlmMkBtYWlsLmNvbSIsImZ1bGxuYW1lIjoic2FpZiBiZXNzYXNzaSIsInBpY3R1cmUiOiJcL3Byb2ZpbGVfcGljdHVyZXNcL3NhaWZfYmVzc2Fzc2lfMzQzNVwvc2FpZl9iZXNzYXNzaV8xNTkwNzcyMzg5anBnIiwiaWQiOjM0MzV9.lWvX3wiO6Y_nBfYZFIMH20sJGDys9PnNmWpXOPpyR1e7b7bkDfqCtHOmahQHuUSk7qiPzBdIc-zZqadfUjXBmOi5FBHoIpASV3IXq_w4J6Sl8bqksw5CWT1WgS7-_lbBMzJlPsTix4KQ4TPUs-xosVtsNqmjR3V1VbPLxdzfv-Tmo2y8hUsgss3MYrU9pd6UlOn3UX_3CXhC2W1AA79YNYUwunL45XUApJvva7ihOZersEYd5IMekDHBxLCA49E3L0jP4UuOUzuYRjALM5rNFzVk38Z1TaKJfwDpxt6CIFCtKl5WK3kmPp5FejitF5nvKNTE_kPcg6CGdREhqAp1KHSNoeAvbHBCro7pqb-XqMc2CDuITdRQKOaMQ6KG-H-Jtf8nLkXXvkJArMGSMmG7oUd0fjkuLwkXuZ0oBW6FNBSCGGMJY61P-ZcUx7PMJpOH2scHbNFZ-iS4HEO_GO4RErxYwAGgcLLJL6RmUMFRUssuh2iPlwH9QU7Utvv1__wHp6VNlaxKZUOvzhdk7CF29CKS1S8SdFH1iGZAVZRof7Ip-DYHNRmUBXmppqduu3Y6CmscilcmI7-Z38TEjyKJIzUlYwCeOWrCAG9Y26edosHq3s86EQ_--C2PdRznGbKRa1QUHf8n77ZgMVylfh4CpKMZV8iAN8csUGqz6kn2cmA",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };
      const spy = spyOn(authenticationService, 'getAppliedJobs').and.returnValue(of({jobs: [5097, 5105, 5109]}));
      authenticationService.handleAuthentication(signinResponse);
      authenticationService.updatePicture(pictureURL);
      expect(JSON.parse(localStorage.getItem('currentUser')).picture).toEqual(pictureURL, 'should update picture in local storage');
      expect(authenticationService.currentUserValue.picture).toEqual(pictureURL, 'should update users\'s picture');
    })
  });

  describe('#addAppliedJob', () => {
    it('should add an applied job', () => {
      const jobID = 5000;
      const signinResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMDY4MjUsImV4cCI6MTU5MTEwNzcyNSwicm9sZXMiOlsiUk9MRV9DQU5ESURBVEUiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJzYWlmMkBtYWlsLmNvbSIsImZ1bGxuYW1lIjoic2FpZiBiZXNzYXNzaSIsInBpY3R1cmUiOiJcL3Byb2ZpbGVfcGljdHVyZXNcL3NhaWZfYmVzc2Fzc2lfMzQzNVwvc2FpZl9iZXNzYXNzaV8xNTkwNzcyMzg5anBnIiwiaWQiOjM0MzV9.lWvX3wiO6Y_nBfYZFIMH20sJGDys9PnNmWpXOPpyR1e7b7bkDfqCtHOmahQHuUSk7qiPzBdIc-zZqadfUjXBmOi5FBHoIpASV3IXq_w4J6Sl8bqksw5CWT1WgS7-_lbBMzJlPsTix4KQ4TPUs-xosVtsNqmjR3V1VbPLxdzfv-Tmo2y8hUsgss3MYrU9pd6UlOn3UX_3CXhC2W1AA79YNYUwunL45XUApJvva7ihOZersEYd5IMekDHBxLCA49E3L0jP4UuOUzuYRjALM5rNFzVk38Z1TaKJfwDpxt6CIFCtKl5WK3kmPp5FejitF5nvKNTE_kPcg6CGdREhqAp1KHSNoeAvbHBCro7pqb-XqMc2CDuITdRQKOaMQ6KG-H-Jtf8nLkXXvkJArMGSMmG7oUd0fjkuLwkXuZ0oBW6FNBSCGGMJY61P-ZcUx7PMJpOH2scHbNFZ-iS4HEO_GO4RErxYwAGgcLLJL6RmUMFRUssuh2iPlwH9QU7Utvv1__wHp6VNlaxKZUOvzhdk7CF29CKS1S8SdFH1iGZAVZRof7Ip-DYHNRmUBXmppqduu3Y6CmscilcmI7-Z38TEjyKJIzUlYwCeOWrCAG9Y26edosHq3s86EQ_--C2PdRznGbKRa1QUHf8n77ZgMVylfh4CpKMZV8iAN8csUGqz6kn2cmA",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };
      const spy = spyOn(authenticationService, 'getAppliedJobs').and.returnValue(of({jobs: [5097, 5105, 5109]}));
      authenticationService.handleAuthentication(signinResponse);
      authenticationService.addAppliedJob(jobID);
      expect(JSON.parse(localStorage.getItem('currentUser')).appliedJobs).toContain(jobID, 'should add job id to local storage');
      expect(authenticationService.currentUserValue.appliedJobs).toContain(jobID, 'should add an applied jobs');
    })
  });

  describe('#signin', () => {
    const candidate = {
      email: 'mail@mail.com',
      password: '12345678'
    };

    it('should signin the candidate', () => {
      let expectedUser = new User; 
        expectedUser.email = "recruiter@recruiter.com";
        expectedUser.fullname = "recruiter one";
        expectedUser.id = 3422;
        expectedUser.roles = ["ROLE_RECRUITER", "ROLE_USER"];
        expectedUser.picture = undefined;
      
      authenticationService.signin(candidate).subscribe(
        data => expect(expectedUser).toEqual(data),
        fail
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/login_check');
      expect(req.request.method).toEqual('POST');

      const expectedResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMTc4NjYsImV4cCI6MTU5MTExODc2Niwicm9sZXMiOlsiUk9MRV9SRUNSVUlURVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJyZWNydWl0ZXJAcmVjcnVpdGVyLmNvbSIsImZ1bGxuYW1lIjoicmVjcnVpdGVyIG9uZSIsImlkIjozNDIyfQ.RR9UMbNT7Z4qIkQQMOLFy8nFXOSl6stClY34PlFnTzh-yunXYhwmQcAPtCXT8f2ja15jGaNf1NvEQMxrXR6A6PIX1Y7D9rzPRE3E2KE6_Y_HC3phVeaJyriKZS_DBnm5ZCcEVbjMLxtqTvgDFkaXMDaapL3_4KOImsoXPOvrFHtLJX1yH9wMbcatwjJ540b1U73qnKMd6-EdfqLhP4T95QrhW2rJ8C7KB0M4rSc14wLmXmJrQtw27xg2gqhjWoo6svU3035qIOh6JczJIzOM0fIXrU_wzqhZSnz2eXtcab_VRQiTQtwW22QN2IH83LeyapVX4J2ElvOnaTcDCKF6W6k-PsjHBib2Z48Ir0yUgGOoWpwJ6uDKbI1T6ZKwH4MpISDgrRG2KFAn5vLkkYRgk3Pt0ekf18GtQz8vbn14V7u3URZl8MNyywhDOHZJjoeBRU26KePbxE08pkwvwj4hc0WAKEKGLCYsdAYkq4tATi5btwGNoKqvgnLaGbQtr6Qi0LZoQeZ4uUdF0QMWEXp-vXnJ5ikPKgG-HnFhtkl7qSQBRGOEj2kVU-Oii4xi9vq7TlZmfj8HBq9aL6zckkyDZgCU1FZkD-YdSxAmkY7ek1AHKIhqu0kSJS_ZmcvYWRj_-APpg4z9xeheW8j3ELTALdxKXwBJ-uJnP6Co1_TCxzk",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };

      req.flush(expectedResponse);
    });

    it('should return Invalid credentials error', () => {
      authenticationService.signin(candidate).subscribe(
        data => fail('expected to fail'),
        error => expect(error.error.message).toContain('Invalid credentials')
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/login_check');
      expect(req.request.method).toEqual('POST');
      const msg = {
        code: 401,
        message: "Invalid credentials."
      }

      req.flush(msg, {status: 401, statusText: 'Not Found'});
    })
  });

  describe('#socialSignin', () => {
    const token = 'kbdckzhbvdjhbezhvbzikdbckzbdikzubzjbeokujzbkujbz';
    const provider = 'google';

    it('should signin the candidate', () => {
      let expectedUser = new User; 
        expectedUser.email = "recruiter@recruiter.com";
        expectedUser.fullname = "recruiter one";
        expectedUser.id = 3422;
        expectedUser.roles = ["ROLE_RECRUITER", "ROLE_USER"];
        expectedUser.picture = undefined;
      
      authenticationService.socialSignin(token, provider).subscribe(
        data => expect(expectedUser).toEqual(data),
        fail
      );

      const req = httpTestingController.expectOne(authenticationService.API_URL + '/api/candidate/social-login');
      expect(req.request.method).toEqual('POST');

      const expectedResponse = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMTc4NjYsImV4cCI6MTU5MTExODc2Niwicm9sZXMiOlsiUk9MRV9SRUNSVUlURVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJyZWNydWl0ZXJAcmVjcnVpdGVyLmNvbSIsImZ1bGxuYW1lIjoicmVjcnVpdGVyIG9uZSIsImlkIjozNDIyfQ.RR9UMbNT7Z4qIkQQMOLFy8nFXOSl6stClY34PlFnTzh-yunXYhwmQcAPtCXT8f2ja15jGaNf1NvEQMxrXR6A6PIX1Y7D9rzPRE3E2KE6_Y_HC3phVeaJyriKZS_DBnm5ZCcEVbjMLxtqTvgDFkaXMDaapL3_4KOImsoXPOvrFHtLJX1yH9wMbcatwjJ540b1U73qnKMd6-EdfqLhP4T95QrhW2rJ8C7KB0M4rSc14wLmXmJrQtw27xg2gqhjWoo6svU3035qIOh6JczJIzOM0fIXrU_wzqhZSnz2eXtcab_VRQiTQtwW22QN2IH83LeyapVX4J2ElvOnaTcDCKF6W6k-PsjHBib2Z48Ir0yUgGOoWpwJ6uDKbI1T6ZKwH4MpISDgrRG2KFAn5vLkkYRgk3Pt0ekf18GtQz8vbn14V7u3URZl8MNyywhDOHZJjoeBRU26KePbxE08pkwvwj4hc0WAKEKGLCYsdAYkq4tATi5btwGNoKqvgnLaGbQtr6Qi0LZoQeZ4uUdF0QMWEXp-vXnJ5ikPKgG-HnFhtkl7qSQBRGOEj2kVU-Oii4xi9vq7TlZmfj8HBq9aL6zckkyDZgCU1FZkD-YdSxAmkY7ek1AHKIhqu0kSJS_ZmcvYWRj_-APpg4z9xeheW8j3ELTALdxKXwBJ-uJnP6Co1_TCxzk",
        refresh_token: 'dbfc6623f20c9207d8c846ae7f4f11ee2bc44d8b4a4f4eec52e878acd84c0247f53bec15a416cb3abf0c2afa9bc2d8ee0b50e2bdcd7ab5d94663d298211f06b6'
      };

      req.flush(expectedResponse);
    });
  });
});
