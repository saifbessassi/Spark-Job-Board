import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { CandidateIdentity } from '../../models/candidate/candidate-identity.model';
import { AuthenticationService } from '../auth/authentication.service';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateID: number;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(data => {
      if(data) {
        this.candidateID = data.id;
      }
    })
  }

  getCandidateProfile() {
    return this.http.get(API_URL + '/api/candidates/' + this.candidateID + '.json');
  }

  getCandidateProfileByID(id: number) {
    return this.http.get(API_URL + '/api/candidates/' + id + '.json');
  }

  getCandidateApplications(id?: number) {
    let candId = this.candidateID;
    if (id) {
      candId = id;
    }
    return this.http.get(API_URL + '/api/job_applications.json?candidate.id=' + candId);
  }

  edit(identity: CandidateIdentity) {
    return this.http.put(API_URL + '/api/candidates/' + this.candidateID, identity);
  }

  addPicture(file: File) {
    const fb = new FormData();
    fb.append('file', file);
    fb.append('userID', this.candidateID.toString());
    return this.http.post(API_URL + '/api/pictures', fb , {
        reportProgress: true,
        observe: 'events'
    });
  }

  deletePicture(id) {
      return this.http.delete(API_URL + '/api/pictures/' + id , {
        reportProgress: true,
        observe: 'events'
    });
  }

  getNbCandidate() {
    return this.http.get(API_URL + '/api/candidates/count');
  }
}
