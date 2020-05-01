import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { CandidateIdentity } from '../../models/candidate/candidate-identity.model';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateID: number;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.candidateID = userService.getId();
  }

  getCandidateProfile() {
    return this.http.get(API_URL + '/api/candidates/' + this.candidateID + '.json');
  }

  edit(identity: CandidateIdentity) {
    return this.http.put(API_URL + '/api/candidates/' + this.candidateID, identity);
  }
}
